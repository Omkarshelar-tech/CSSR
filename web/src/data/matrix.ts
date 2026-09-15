import type { ControlDomain } from "./types";

export const matrix: ControlDomain[] = [
  {
    id: "A",
    title: "Physical & Infrastructure",
    controls: [
      { id: "A1", control: "Physical data center security (guards, badges, cameras)", owner: "Provider", notes: "AWS-owned facilities; customer has no access." },
      { id: "A2", control: "Hardware provisioning & secure media disposal", owner: "Provider", notes: "AWS wipes/destroys failed disks." },
      { id: "A3", control: "Power, cooling, environmental controls", owner: "Provider", notes: "Fully AWS-managed." },
      { id: "A4", control: "Virtualization / hypervisor security", owner: "Provider", notes: "AWS Nitro hypervisor isolation." },
      { id: "A5", control: "Region / AZ placement for resilience & data residency", owner: "Customer", notes: "Customer picks region (compliance/GDPR) and Multi-AZ." },
    ],
  },
  {
    id: "B",
    title: "Network Security",
    controls: [
      { id: "B1", control: "Physical network fabric, backbone, cabling", owner: "Provider", notes: "AWS global network." },
      { id: "B2", control: "VPC / subnet design & segmentation (Web/App/DB)", owner: "Customer", notes: "Customer designs the 3 tiers and isolation." },
      { id: "B3", control: "Security group & NACL rules", owner: "Customer", notes: "Customer scopes ports (443 in, 5432 app→DB only)." },
      { id: "B4", control: "DDoS protection — network layer (L3/L4)", owner: "Provider", notes: "AWS Shield Standard automatic." },
      { id: "B5", control: "DDoS protection — application layer (L7)", owner: "Shared", notes: "AWS provides Shield; customer tunes WAF rules & rate limits." },
      { id: "B6", control: "WAF rule configuration (OWASP Top 10, custom)", owner: "Customer", notes: "Customer authors/maintains AWS WAF rules." },
      { id: "B7", control: "TLS certificate management & cipher policy", owner: "Shared", notes: "ACM issues/rotates certs; customer selects security policy." },
      { id: "B8", control: "Preventing public exposure of App/DB tiers", owner: "Customer", notes: "Customer ensures no public IPs / restrictive routing." },
    ],
  },
  {
    id: "C",
    title: "Compute & Operating System",
    intro: "This is where IaaS vs PaaS changes the answer. Split by component.",
    controls: [
      { id: "C1", control: "Host/hypervisor patching (physical hosts)", owner: "Provider", notes: "AWS-managed for all services." },
      { id: "C2", control: "EC2 (app tier) guest OS patching & updates", owner: "Customer", notes: "IaaS → customer owns OS patching, kernel updates." },
      { id: "C3", control: "EC2 OS hardening / CIS benchmark / default accounts", owner: "Customer", notes: "Customer builds hardened AMIs." },
      { id: "C4", control: "EC2 anti-malware / host IDS / EDR agent", owner: "Customer", notes: "Customer installs & operates." },
      { id: "C5", control: "RDS (DB tier) engine + underlying OS patching", owner: "Provider", notes: "PaaS → AWS patches PostgreSQL engine & host OS." },
      { id: "C6", control: "RDS maintenance window scheduling & approval", owner: "Shared", notes: "AWS supplies patches; customer schedules the window." },
      { id: "C7", control: "S3 / CloudFront underlying compute & patching", owner: "Provider", notes: "Fully managed by AWS." },
      { id: "C8", control: "Auto Scaling / capacity & availability of app tier", owner: "Shared", notes: "AWS provides ASG; customer configures scaling policies." },
    ],
  },
  {
    id: "D",
    title: "Application & Runtime",
    controls: [
      { id: "D1", control: "Application source code security (secure SDLC, review)", owner: "Customer", notes: "Customer owns all ShopFast code." },
      { id: "D2", control: "Dependency / library vulnerability management (SCA)", owner: "Customer", notes: "Customer scans and patches packages." },
      { id: "D3", control: "Application runtime (Node.js) install, config, hardening", owner: "Customer", notes: "IaaS runtime is customer-owned." },
      { id: "D4", control: "Input validation / encoding / CSRF / injection defenses", owner: "Customer", notes: "Application-layer controls are customer code." },
      { id: "D5", control: "Session management & secure cookies", owner: "Customer", notes: "Customer implements." },
      { id: "D6", control: "Secrets handling (no hard-coded creds)", owner: "Shared", notes: "AWS secures Secrets Manager; customer stores/rotates/scopes." },
    ],
  },
  {
    id: "E",
    title: "Identity & Access Management",
    controls: [
      { id: "E1", control: "IAM service availability & integrity", owner: "Provider", notes: "AWS runs IAM." },
      { id: "E2", control: "IAM users, roles, policies (least privilege)", owner: "Customer", notes: "Customer defines all principals & permissions." },
      { id: "E3", control: "Root account protection & MFA", owner: "Customer", notes: "Customer secures root, enables MFA." },
      { id: "E4", control: "EC2 instance roles (no long-lived keys on hosts)", owner: "Customer", notes: "Customer assigns scoped instance profiles." },
      { id: "E5", control: "End-customer (shopper) authentication & account security", owner: "Customer", notes: "ShopFast owns login, password policy, MFA." },
      { id: "E6", control: "Key management infrastructure (KMS HSMs)", owner: "Provider", notes: "AWS operates KMS hardware." },
      { id: "E7", control: "KMS key policies, rotation settings, grants", owner: "Customer", notes: "Customer configures who can use which key." },
    ],
  },
  {
    id: "F",
    title: "Data Protection",
    controls: [
      { id: "F1", control: "Data classification (PII, cardholder, catalog)", owner: "Customer", notes: "Customer classifies its own data." },
      { id: "F2", control: "Encryption at rest — service capability", owner: "Provider", notes: "AWS provides encryption features." },
      { id: "F3", control: "Enabling & configuring encryption at rest", owner: "Customer", notes: "Customer must turn it on and pick the key." },
      { id: "F4", control: "Encryption in transit (TLS end-to-end)", owner: "Customer", notes: "Customer enforces HTTPS/TLS between tiers." },
      { id: "F5", control: "Data ownership & content", owner: "Customer", notes: "The data is always the customer's." },
      { id: "F6", control: "Backup execution (RDS snapshots)", owner: "Shared", notes: "AWS runs snapshots; customer sets retention & tests restores." },
      { id: "F7", control: "Data retention & secure deletion policy", owner: "Customer", notes: "Customer defines lifecycle rules." },
      { id: "F8", control: "Preventing S3 public-bucket misconfiguration", owner: "Customer", notes: "Customer sets Block Public Access & bucket policies." },
      { id: "F9", control: "Cardholder data scope (PCI) — tokenization via gateway", owner: "Customer", notes: "Customer designed flow to avoid storing PAN." },
    ],
  },
  {
    id: "G",
    title: "Logging, Monitoring & Detection",
    controls: [
      { id: "G1", control: "Availability of logging services (CloudTrail, CloudWatch)", owner: "Provider", notes: "AWS operates the platforms." },
      { id: "G2", control: "Enabling CloudTrail & protecting log integrity", owner: "Customer", notes: "Customer turns it on, locks the log bucket." },
      { id: "G3", control: "Application & OS log collection from EC2", owner: "Customer", notes: "Customer ships app/OS logs." },
      { id: "G4", control: "Threat detection tuning (GuardDuty triage)", owner: "Shared", notes: "AWS generates findings; customer investigates & responds." },
      { id: "G5", control: "Alerting, dashboards, and on-call response", owner: "Customer", notes: "Customer builds alarms & runbooks." },
    ],
  },
  {
    id: "H",
    title: "Incident Response, Governance & Compliance",
    controls: [
      { id: "H1", control: "Provider-side incident response (their infra)", owner: "Provider", notes: "AWS handles incidents affecting the platform." },
      { id: "H2", control: "Customer-side IR plan for ShopFast (app/data breach)", owner: "Customer", notes: "Customer owns detection→containment→recovery." },
      { id: "H3", control: "Compliance of underlying services (SOC 2, ISO, PCI)", owner: "Provider", notes: "AWS certifies the infrastructure." },
      { id: "H4", control: "Application/workload compliance & audit evidence", owner: "Customer", notes: "Customer proves its config meets PCI/GDPR." },
      { id: "H5", control: "Configuration drift detection (AWS Config rules)", owner: "Customer", notes: "Customer defines and monitors baselines." },
    ],
  },
];

export const allControls = matrix.flatMap((d) => d.controls);
