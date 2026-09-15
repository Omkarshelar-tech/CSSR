import type { Asset } from "./types";

export const assets: Asset[] = [
  { id: "AS-01", asset: "Static front-end (SPA, HTML/JS/CSS)", tier: "Web", type: "Code/content", classification: "Public", owner: "Customer", service: "S3 + CloudFront" },
  { id: "AS-02", asset: "Product images & media", tier: "Web", type: "Data", classification: "Public", owner: "Customer", service: "S3" },
  { id: "AS-03", asset: "Public DNS records", tier: "Web", type: "Config", classification: "Internal", owner: "Customer", service: "Route 53" },
  { id: "AS-04", asset: "WAF rule set", tier: "Web", type: "Security config", classification: "Confidential", owner: "Customer", service: "AWS WAF" },
  { id: "AS-05", asset: "TLS certificates", tier: "Web", type: "Secret material", classification: "Restricted", owner: "Shared", service: "ACM" },
  { id: "AS-06", asset: "Load balancer config", tier: "App", type: "Config", classification: "Internal", owner: "Customer", service: "ALB" },
  { id: "AS-07", asset: "ShopFast application code", tier: "App", type: "Code", classification: "Confidential", owner: "Customer", service: "EC2" },
  { id: "AS-08", asset: "EC2 instances / AMIs", tier: "App", type: "Compute", classification: "Confidential", owner: "Customer", service: "EC2 (IaaS)" },
  { id: "AS-09", asset: "Application runtime & OS", tier: "App", type: "Platform", classification: "Confidential", owner: "Customer", service: "EC2 (IaaS)" },
  { id: "AS-10", asset: "DB credentials / API keys", tier: "App", type: "Secret", classification: "Restricted", owner: "Customer", service: "Secrets Manager" },
  { id: "AS-11", asset: "Customer PII (name, email, address)", tier: "DB", type: "Data", classification: "Restricted", owner: "Customer", service: "RDS" },
  { id: "AS-12", asset: "Order & transaction records", tier: "DB", type: "Data", classification: "Restricted", owner: "Customer", service: "RDS" },
  { id: "AS-13", asset: "Product catalog data", tier: "DB", type: "Data", classification: "Internal", owner: "Customer", service: "RDS" },
  { id: "AS-14", asset: "Database engine & host OS", tier: "DB", type: "Platform", classification: "Confidential", owner: "Provider", service: "RDS (PaaS)" },
  { id: "AS-15", asset: "DB encryption keys", tier: "DB", type: "Secret material", classification: "Restricted", owner: "Customer", service: "KMS" },
  { id: "AS-16", asset: "Automated backups / snapshots", tier: "DB", type: "Data", classification: "Restricted", owner: "Shared", service: "RDS" },
  { id: "AS-17", asset: "IAM roles & policies", tier: "Cross", type: "Access config", classification: "Restricted", owner: "Customer", service: "IAM" },
  { id: "AS-18", asset: "Audit logs (CloudTrail)", tier: "Cross", type: "Log data", classification: "Confidential", owner: "Customer", service: "CloudTrail/S3" },
  { id: "AS-19", asset: "App & OS logs / metrics", tier: "Cross", type: "Log data", classification: "Internal", owner: "Customer", service: "CloudWatch" },
  { id: "AS-20", asset: "Cardholder data (in transit only)", tier: "App", type: "Data", classification: "Restricted", owner: "Customer", service: "Payment gateway (tokenized)" },
];
