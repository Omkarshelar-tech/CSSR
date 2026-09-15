# 02 — Asset Inventory & Definition

Responsibility mapping starts with knowing *what* you have to protect. This inventory
lists every asset in `ShopFast`, the tier it lives in, its data/criticality
classification, and the responsible owner. It feeds directly into the Shared
Responsibility Matrix (`03-...`).

## Classification Scheme

| Level | Meaning | Examples |
|-------|---------|----------|
| **Restricted** | Breach causes severe harm / regulatory penalty | Cardholder data, credentials, PII |
| **Confidential** | Internal-only, business-sensitive | Order history, app config, secrets |
| **Internal** | Non-public but low sensitivity | Logs, metrics |
| **Public** | Intended for anyone | Product catalog images, marketing pages |

## Asset Register

| ID | Asset | Tier | Type | Classification | Primary Owner | Backing Service |
|----|-------|------|------|----------------|:-------------:|-----------------|
| AS-01 | Static front-end (SPA, HTML/JS/CSS) | Web | Code/content | Public | Customer | S3 + CloudFront |
| AS-02 | Product images & media | Web | Data | Public | Customer | S3 |
| AS-03 | Public DNS records | Web | Config | Internal | Customer | Route 53 |
| AS-04 | WAF rule set | Web | Security config | Confidential | Customer | AWS WAF |
| AS-05 | TLS certificates | Web/App | Secret material | Restricted | Shared | ACM |
| AS-06 | Load balancer config | App | Config | Internal | Customer | ALB |
| AS-07 | ShopFast application code | App | Code | Confidential | Customer | EC2 |
| AS-08 | EC2 instances / AMIs | App | Compute | Confidential | Customer | EC2 (IaaS) |
| AS-09 | Application runtime & OS | App | Platform | Confidential | Customer | EC2 (IaaS) |
| AS-10 | DB credentials / API keys | App | Secret | Restricted | Customer | Secrets Manager |
| AS-11 | Customer PII (name, email, address) | DB | Data | Restricted | Customer | RDS |
| AS-12 | Order & transaction records | DB | Data | Restricted | Customer | RDS |
| AS-13 | Product catalog data | DB | Data | Internal | Customer | RDS |
| AS-14 | Database engine & host OS | DB | Platform | Confidential | Provider | RDS (PaaS) |
| AS-15 | DB encryption keys | DB | Secret material | Restricted | Customer | KMS |
| AS-16 | Automated backups / snapshots | DB | Data | Restricted | Shared | RDS |
| AS-17 | IAM roles & policies | Cross | Access config | Restricted | Customer | IAM |
| AS-18 | Audit logs (CloudTrail) | Cross | Log data | Confidential | Customer | CloudTrail/S3 |
| AS-19 | App & OS logs / metrics | Cross | Log data | Internal | Customer | CloudWatch |
| AS-20 | Cardholder data (in transit only) | App | Data | Restricted | Customer | Payment gateway (tokenized) |

## Notes on Ownership

- **Customer-owned** dominates the register: data, code, config, secrets, and IAM.
  The provider directly owns only the underlying platform of managed services
  (AS-14) and shares a few (AS-05, AS-16).
- **Restricted assets** (AS-05, AS-10, AS-11, AS-12, AS-15, AS-16, AS-20) get the
  strictest controls: encryption, least-privilege access, and monitoring. These map
  to matrix rows in sections **E (IAM)** and **F (Data Protection)**.
- **AS-20** is deliberately "in transit only" — `ShopFast` never persists raw card
  numbers, which keeps most of PCI DSS out of scope (see matrix F9).
