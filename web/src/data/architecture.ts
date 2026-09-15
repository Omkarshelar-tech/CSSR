import type { Tier } from "./types";

export const tiers: Tier[] = [
  {
    id: "web",
    name: "Web / Presentation Tier",
    tagline: "Serves the UI, terminates public traffic, forwards dynamic requests inward.",
    accent: "#38bdf8",
    components: [
      { name: "CDN / edge cache", service: "Amazon CloudFront", model: "PaaS/managed", role: "Caches static assets, TLS termination, DDoS edge protection" },
      { name: "Static assets", service: "Amazon S3", model: "PaaS/managed", role: "Object storage for the SPA and media" },
      { name: "Web Application Firewall", service: "AWS WAF", model: "Managed", role: "Filters OWASP Top 10 attacks at the edge" },
      { name: "DNS", service: "Amazon Route 53", model: "Managed", role: "Public name resolution, health checks" },
    ],
  },
  {
    id: "app",
    name: "Application / Logic Tier",
    tagline: "Runs business logic: auth, cart, orders, payment calls. The IaaS part — most customer responsibility.",
    accent: "#a78bfa",
    components: [
      { name: "Load balancer", service: "Application Load Balancer", model: "Managed", role: "Distributes traffic, TLS to app, health checks" },
      { name: "App servers", service: "Amazon EC2 (Auto Scaling)", model: "IaaS", role: "Runs the ShopFast API / server code" },
      { name: "Secrets", service: "AWS Secrets Manager", model: "Managed", role: "Stores DB credentials, API keys, payment tokens" },
      { name: "Runtime / OS", service: "Customer-installed (Node.js on Linux)", model: "Customer", role: "Application runtime and operating system" },
    ],
  },
  {
    id: "db",
    name: "Database / Data Tier",
    tagline: "Persists customer, catalog, and order data. No public exposure — reachable only from the app tier.",
    accent: "#34d399",
    components: [
      { name: "Relational DB", service: "Amazon RDS (PostgreSQL, Multi-AZ)", model: "PaaS", role: "Transactional store for users, orders, catalog" },
      { name: "Backups / snapshots", service: "RDS automated backups", model: "Managed", role: "Point-in-time recovery" },
      { name: "Encryption keys", service: "AWS KMS", model: "Managed", role: "Encryption of data at rest" },
    ],
  },
];

export const dataFlow: string[] = [
  "Browser resolves shopfast.example.com via Route 53.",
  "Request hits CloudFront; static assets served from cache/S3. WAF inspects the request.",
  "Dynamic API calls pass through to the ALB in the public subnet.",
  "ALB forwards to an EC2 app server in the private subnet over TLS.",
  "App server reads credentials from Secrets Manager, queries RDS on the DB-only port.",
  "App server calls the external payment gateway over TLS; card data is tokenized, never stored.",
  "Order is written to RDS (encrypted at rest via KMS); confirmation returns to the customer.",
];

export const architectureDiagram = `flowchart TB
    User([Customer Browser])
    subgraph AWS["AWS Cloud - Region us-east-1"]
        subgraph Edge["Edge / Managed (PaaS)"]
            R53[Route 53 DNS]
            CF[CloudFront CDN]
            WAF[AWS WAF]
            S3[(S3 Static Assets)]
        end
        subgraph Public["Web Tier - Public Subnet"]
            ALB[Application Load Balancer]
        end
        subgraph Private["App Tier - Private Subnet (IaaS)"]
            EC2A[EC2 App Server]
            EC2B[EC2 App Server]
            SM[Secrets Manager]
        end
        subgraph Isolated["DB Tier - Isolated Subnet (PaaS)"]
            RDS[(RDS PostgreSQL Multi-AZ)]
            KMS[KMS Keys]
        end
    end
    PAY([External Payment Gateway])
    User -->|HTTPS 443| CF
    CF --> WAF
    WAF --> S3
    WAF -->|dynamic API| ALB
    ALB -->|TLS| EC2A
    ALB -->|TLS| EC2B
    EC2A --> SM
    EC2A -->|5432 only| RDS
    EC2B -->|5432 only| RDS
    RDS -.encrypts with.-> KMS
    EC2A -->|TLS, tokenized| PAY`;
