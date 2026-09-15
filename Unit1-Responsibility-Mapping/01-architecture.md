# 01 — 3-Tier Architecture: `ShopFast` E-Commerce Web Application

## 1. Purpose

`ShopFast` is a public, internet-facing e-commerce store. Customers browse a product
catalog, register accounts, add items to a cart, and check out with a card payment.
The system follows the classic **3-tier model** so that presentation, business logic,
and persistence are separated, each in its own security zone.

## 2. The Three Tiers

### Tier 1 — Web / Presentation Tier
Serves the UI and static content, terminates public traffic, and forwards dynamic
requests inward.

| Component | Cloud service | Service model | Role |
|-----------|---------------|---------------|------|
| CDN / edge cache | Amazon CloudFront | PaaS/managed | Caches static assets, TLS termination, DDoS edge protection |
| Static assets (HTML/JS/CSS, images) | Amazon S3 | PaaS/managed | Object storage for the SPA and media |
| Web Application Firewall | AWS WAF | Managed | Filters OWASP Top 10 attacks at the edge |
| DNS | Amazon Route 53 | Managed | Public name resolution, health checks |

### Tier 2 — Application / Logic Tier
Runs the business logic: authentication, cart, order orchestration, calls to the
payment gateway. **This is the IaaS part of the stack** and therefore carries the
most customer responsibility.

| Component | Cloud service | Service model | Role |
|-----------|---------------|---------------|------|
| Load balancer | Application Load Balancer (ALB) | Managed | Distributes traffic, TLS to app, health checks |
| App servers | Amazon EC2 (Auto Scaling group) | **IaaS** | Runs the ShopFast API / server code |
| Secrets | AWS Secrets Manager | Managed | Stores DB credentials, API keys, payment tokens |
| Container/runtime | Customer-installed (e.g. Node.js on Linux) | Customer | Application runtime and OS |

### Tier 3 — Database / Data Tier
Persists customer, catalog, and order data. No public exposure — reachable only
from the app tier.

| Component | Cloud service | Service model | Role |
|-----------|---------------|---------------|------|
| Relational DB | Amazon RDS (PostgreSQL, Multi-AZ) | **PaaS** | Transactional store for users, orders, catalog |
| Backups / snapshots | RDS automated backups | Managed | Point-in-time recovery |
| Encryption keys | AWS KMS | Managed (customer-controlled keys) | Encryption of data at rest |

## 3. Network Segmentation (Trust Boundaries)

Each tier lives in its own subnet with tightly scoped security groups. Traffic can
only flow **inward** from the tier above it.

| Zone | Subnet type | Inbound allowed from | Public IP? |
|------|-------------|----------------------|------------|
| Web tier | Public subnet | Internet (443 only) | Yes (via CloudFront/ALB) |
| App tier | Private subnet | Web tier / ALB only (app port) | No |
| DB tier | Isolated private subnet | App tier only (5432) | No |

- No component in the App or DB tier has a public IP address.
- Outbound internet from private subnets is via a NAT gateway (for patches/updates).
- Security groups reference each other by ID, not by CIDR, so the rules stay tight.

## 4. Data Flow (Happy Path: A Customer Checkout)

1. Customer's browser resolves `shopfast.example.com` via **Route 53**.
2. Request hits **CloudFront**; static assets are served from cache/**S3**.
   **WAF** inspects the request.
3. Dynamic API calls pass through to the **ALB** in the web/public subnet.
4. ALB forwards to an **EC2** app server in the private subnet over TLS.
5. App server reads DB credentials from **Secrets Manager**, queries **RDS**
   over the DB-only port.
6. App server calls the external **payment gateway** over TLS; card data is
   tokenized and never stored in `ShopFast`.
7. Order is written to **RDS** (encrypted at rest via **KMS**); confirmation
   returns to the customer.

## 5. Cross-Cutting Services

| Concern | Service | Notes |
|---------|---------|-------|
| Identity & access | AWS IAM | Roles for EC2, least-privilege policies |
| Logging | CloudTrail + CloudWatch Logs | API audit trail + app/OS logs |
| Monitoring | CloudWatch + GuardDuty | Metrics, alarms, threat detection |
| Config/compliance | AWS Config | Drift detection against baselines |

## 6. Why the Service Model Matters Here

`ShopFast` deliberately mixes models, which is why a single blanket responsibility
statement would be wrong:

- **EC2 app tier = IaaS** → the customer patches the OS, hardens the runtime,
  and secures the app code.
- **RDS = PaaS** → AWS patches the DB engine and OS; the customer still owns
  schema, access control, encryption config, and data.
- **S3 / CloudFront / WAF = managed** → AWS runs the service; the customer owns
  configuration (bucket policies, cache behavior, WAF rules) and data.

The Shared Responsibility Matrix in `03-shared-responsibility-matrix.md` encodes
exactly these differences.
