export type Owner = "Customer" | "Provider" | "Shared";

export interface Control {
  id: string;
  control: string;
  owner: Owner;
  notes: string;
}

export interface ControlDomain {
  id: string;
  title: string;
  intro?: string;
  controls: Control[];
}

export type Classification =
  | "Restricted"
  | "Confidential"
  | "Internal"
  | "Public";

export interface Asset {
  id: string;
  asset: string;
  tier: "Web" | "App" | "DB" | "Cross";
  type: string;
  classification: Classification;
  owner: Owner;
  service: string;
}

export interface TierComponent {
  name: string;
  service: string;
  model: string;
  role: string;
}

export interface Tier {
  id: string;
  name: string;
  tagline: string;
  accent: string;
  components: TierComponent[];
}
