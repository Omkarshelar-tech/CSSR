# Unit 1 — Responsibility Mapping & Asset Definition

## Assignment Overview

In this unit you design the architecture of a **3-tier web application** (Web tier,
Application tier, Database tier) and produce a **Shared Responsibility Matrix (SRM)**
that is *specifically tailored* to your application. The goal is to move past the
generic vendor diagram and document exactly which security controls **you (the
customer)** own versus which the **cloud provider** owns for the concrete services
you chose.

## Deliverables

| # | File | What it contains |
|---|------|------------------|
| 1 | `01-architecture.md` | The 3-tier architecture: tiers, components, data flow, and the specific cloud services selected. |
| 2 | `02-asset-inventory.md` | An asset definition table — every asset in the system, its tier, classification, and owner. |
| 3 | `03-shared-responsibility-matrix.md` | The tailored SRM: control-by-control mapping of Customer vs Cloud Provider (vs Shared). |
| 4 | `04-architecture-diagram.md` | A visual (Mermaid) diagram of the architecture and trust boundaries. |

## Scenario Used in This Example

- **Application:** `ShopFast` — a customer-facing e-commerce web store.
- **Cloud provider / model:** AWS, using a **mix of IaaS and PaaS** managed services.
- **Deployment model:** Public cloud, single region, multi-AZ for resilience.

> **How to reuse this:** If your team chose Azure or GCP, or a different app,
> keep the *structure* of these documents and swap in your own services. The
> matrix rows stay largely the same; only the "who is responsible" column shifts
> depending on whether a service is IaaS, PaaS, or SaaS.

## The Core Principle: Responsibility Shifts with the Service Model

Security *in* the cloud is the customer's job; security *of* the cloud is the
provider's job. But the boundary line **moves** depending on the service model:

```
              IaaS            PaaS            SaaS
Data          CUSTOMER        CUSTOMER        CUSTOMER
App code      CUSTOMER        CUSTOMER        provider
Runtime       CUSTOMER        provider        provider
OS/patching   CUSTOMER        provider        provider
Virtualization provider       provider        provider
Physical      provider        provider        provider
```

Because `ShopFast` mixes models (EC2 for the app tier = IaaS, RDS for the database
= PaaS, S3/CloudFront for static web = PaaS), the matrix has to be built
per-service, not with one blanket rule. That is the whole point of this exercise.
