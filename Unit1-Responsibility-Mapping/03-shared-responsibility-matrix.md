# 03 — Shared Responsibility Matrix (SRM) for `ShopFast`

This matrix is **tailored to the specific services** in `01-architecture.md`. Each
row is a security control. The owner column reflects the *actual* service model of
the component involved, not a generic blanket rule.

**Legend**
- **C** = Customer (you / the ShopFast team) is responsible.
- **P** = Cloud Provider (AWS) is responsible.
- **S** = Shared — both parties own a portion; the "Notes" column splits it.

---

## A. Physical & Infrastructure Layer

| # | Control | Owner | Notes |
|---|---------|:-----:|-------|
| A1 | Physical data center security (guards, badges, cameras) | P | AWS-owned facilities; customer has no access. |
| A2 | Hardware provisioning & decommissioning (secure media disposal) | P | AWS wipes/destroys failed disks. |
| A3 | Power, cooling, environmental controls | P | Fully AWS-managed. |
| A4 | Virtualization / hypervisor security | P | AWS Nitro hypervisor isolation. |
| A5 | Choosing region / AZ placement for resilience & data residency | C | Customer picks region (e.g. compliance/GDPR) and Multi-AZ. |

## B. Network Security

| # | Control | Owner | Notes |
|---|---------|:-----:|-------|
| B1 | Physical network fabric, backbone, cabling | P | AWS global network. |
| B2 | VPC / subnet design & segmentation (Web/App/DB) | C | Customer designs the 3 tiers and isolation. |
| B3 | Security group & NACL rules | C | Customer scopes ports (443 in, 5432 app→DB only). |
| B4 | DDoS protection — network layer (L3/L4) | P | AWS Shield Standard automatic. |
| B5 | DDoS protection — application layer (L7) | S | AWS provides Shield; **customer** tunes WAF rules & rate limits. |
| B6 | WAF rule configuration (OWASP Top 10, custom rules) | C | Customer authors/maintains AWS WAF rules. |
| B7 | TLS certificate management & cipher policy | S | AWS ACM issues/rotates certs; **customer** selects the security policy and enforces HTTPS. |
| B8 | Preventing public exposure of App/DB tiers | C | Customer ensures no public IPs / restrictive routing. |

## C. Compute & Operating System

> This is where **IaaS vs PaaS** changes the answer. Split by component.

| # | Control | Owner | Notes |
|---|---------|:-----:|-------|
| C1 | Host/hypervisor patching (underlying physical hosts) | P | AWS-managed for all services. |
| C2 | **EC2 (app tier)** guest OS patching & updates | **C** | IaaS → customer owns OS patching, kernel updates. |
| C3 | **EC2** OS hardening / CIS benchmark / removing default accounts | **C** | Customer builds hardened AMIs. |
| C4 | **EC2** anti-malware / host IDS / EDR agent | **C** | Customer installs & operates. |
| C5 | **RDS (DB tier)** DB engine + underlying OS patching | **P** | PaaS → AWS patches PostgreSQL engine & host OS. |
| C6 | **RDS** maintenance window scheduling & approval | S | AWS supplies patches; **customer** schedules/approves the window. |
| C7 | **S3 / CloudFront** underlying compute & patching | P | Fully managed by AWS. |
| C8 | Auto Scaling / capacity & availability of app tier | S | AWS provides ASG service; **customer** configures scaling policies. |

## D. Application & Runtime

| # | Control | Owner | Notes |
|---|---------|:-----:|-------|
| D1 | Application source code security (secure SDLC, code review) | C | Customer owns all ShopFast code. |
| D2 | Dependency / library vulnerability management (SCA) | C | Customer scans and patches npm/OS packages. |
| D3 | Application runtime (Node.js) install, config, hardening | C | IaaS runtime is customer-owned. |
| D4 | Input validation / output encoding / CSRF / injection defenses | C | Application-layer controls are customer code. |
| D5 | Session management & secure cookies | C | Customer implements. |
| D6 | Secrets handling (no hard-coded creds; use Secrets Manager) | S | AWS secures the Secrets Manager service; **customer** stores, rotates, and scopes access. |

## E. Identity & Access Management

| # | Control | Owner | Notes |
|---|---------|:-----:|-------|
| E1 | IAM service availability & integrity | P | AWS runs IAM. |
| E2 | IAM users, roles, policies (least privilege) | C | Customer defines all principals & permissions. |
| E3 | Root account protection & MFA | C | Customer secures root, enables MFA. |
| E4 | EC2 instance roles (no long-lived keys on hosts) | C | Customer assigns scoped instance profiles. |
| E5 | End-customer (shopper) authentication & account security | C | ShopFast owns its own user login, password policy, MFA. |
| E6 | Key management infrastructure (KMS HSMs) | P | AWS operates KMS hardware. |
| E7 | KMS key policies, rotation settings, grants | C | Customer configures who can use which key. |

## F. Data Protection

| # | Control | Owner | Notes |
|---|---------|:-----:|-------|
| F1 | Data classification (PII, cardholder, catalog) | C | Customer classifies its own data. |
| F2 | Encryption at rest — service capability | P | AWS provides encryption features on S3/RDS/EBS. |
| F3 | Enabling & configuring encryption at rest | C | Customer must turn it on and pick the key. |
| F4 | Encryption in transit (TLS end-to-end) | C | Customer enforces HTTPS/TLS between tiers. |
| F5 | Data ownership & content | C | The data is always the customer's. |
| F6 | Backup execution (RDS snapshots) | S | AWS runs the snapshot mechanism; **customer** sets retention/frequency & tests restores. |
| F7 | Data retention & secure deletion policy | C | Customer defines lifecycle rules. |
| F8 | Preventing S3 public-bucket misconfiguration | C | Customer sets Block Public Access & bucket policies. |
| F9 | Cardholder data scope (PCI) — tokenization via gateway | C | Customer designed the flow to avoid storing PAN. |

## G. Logging, Monitoring & Detection

| # | Control | Owner | Notes |
|---|---------|:-----:|-------|
| G1 | Availability of logging services (CloudTrail, CloudWatch) | P | AWS operates the platforms. |
| G2 | Enabling CloudTrail & protecting log integrity | C | Customer turns it on, locks the log bucket. |
| G3 | Application & OS log collection from EC2 | C | Customer ships app/OS logs. |
| G4 | Threat detection tuning (GuardDuty findings triage) | S | AWS generates findings; **customer** investigates & responds. |
| G5 | Alerting, dashboards, and on-call response | C | Customer builds alarms & runbooks. |

## H. Incident Response, Governance & Compliance

| # | Control | Owner | Notes |
|---|---------|:-----:|-------|
| H1 | Provider-side incident response (their infra) | P | AWS handles incidents affecting the platform. |
| H2 | Customer-side IR plan for ShopFast (breach in app/data) | C | Customer owns detection→containment→recovery for its workload. |
| H3 | Compliance of underlying services (SOC 2, ISO, PCI DSS Level 1) | P | AWS certifies the infrastructure. |
| H4 | Application/workload compliance & audit evidence | C | Customer must prove *its* configuration meets PCI/GDPR. |
| H5 | Configuration drift detection (AWS Config rules) | C | Customer defines and monitors baselines. |

---

## Summary — Where the Line Sits for `ShopFast`

| Layer | Primarily Customer | Primarily Provider | Shared |
|-------|:------------------:|:------------------:|:------:|
| Physical / infra | — | ✔ | — |
| Network | ✔ (design, SG, WAF) | partial (fabric, L3 DDoS) | TLS, L7 DDoS |
| Compute — EC2 (IaaS) | ✔ (OS, runtime) | host only | scaling |
| Compute — RDS (PaaS) | data/access | ✔ (engine, OS) | maintenance window |
| Application | ✔ | — | secrets |
| IAM | ✔ | KMS/IAM infra | — |
| Data | ✔ (classify, config, keys) | encryption capability | backups |
| Logging/detection | ✔ | platform | GuardDuty triage |
| Compliance | app-level | infra-level | — |

**Key takeaways for the write-up:**
1. The customer's responsibility is heaviest on the **EC2 app tier** because it is
   IaaS — OS, runtime, and code are all yours.
2. Moving the database to **RDS (PaaS)** offloaded engine/OS patching to AWS, but
   **data, access control, and encryption configuration stayed with you**.
3. Almost every "the provider gives you the capability, but you must configure and
   operate it" control lands in the **Shared** column — these are the rows where
   most real-world breaches happen (e.g., a public S3 bucket, an unrestricted
   security group). Configuration is *always* the customer's job.
