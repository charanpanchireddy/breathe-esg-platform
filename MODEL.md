# MODEL.md

## Data Model Overview

The system is designed to ingest emissions and activity data from multiple enterprise data sources and normalize them into a single review workflow.

Main entities:

- EmissionRecord
- UploadSource
- User / Analyst
- Audit Metadata

---

## EmissionRecord

Fields:

- activity
- quantity
- unit
- emissions
- source_type
- uploaded_at
- status
- suspicious_flag

This model stores normalized emissions data regardless of whether the source was SAP, utility data, or travel data.

---

## Multi-Tenancy

The prototype is designed with future tenant separation in mind.

In production, each record would contain:

- tenant_id
- organization_id

This was omitted from the prototype for simplicity.

---

## Scope Categorization

The system supports:

- Scope 1 → Fuel / diesel
- Scope 2 → Electricity
- Scope 3 → Business travel

Each uploaded record can later be mapped to a scope category.

---

## Source of Truth Tracking

Each record tracks:

- upload source
- upload timestamp
- suspicious status
- analyst review state

This provides basic audit traceability.

---

## Unit Normalization

Different source systems use different units.

Examples:

- km
- liters
- kWh

The prototype normalizes emissions into a common emissions value.

---

## Audit Trail

The dashboard allows analysts to review suspicious records before approval.

Future production improvements:

- immutable audit logs
- row version history
- approval timestamps
- reviewer identity tracking