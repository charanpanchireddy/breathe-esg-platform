# SOURCES.md

## Research Sources

### SAP Fuel / Procurement Data

Researched:
- SAP flat-file exports
- SAP OData concepts
- Enterprise CSV export workflows

Observations:
- inconsistent units
- complex column naming
- plant code mappings
- messy formatting

Sample data was intentionally designed with inconsistent values to simulate real operational exports.

---

## Utility Electricity Data

Researched:
- utility portal CSV exports
- billing period structures
- kWh usage formats

Observations:
- billing periods do not align with months
- units vary between utilities
- estimated readings may occur

The prototype uses CSV uploads to simulate facilities team exports.

---

## Corporate Travel Data

Researched:
- Concur
- Navan
- travel activity exports

Observations:
- flight distance data may be incomplete
- categories affect emission calculations
- airport codes are frequently used

Sample records include flights and ground transport examples.

---

## What Would Break In Production

- Large file uploads
- inconsistent enterprise schemas
- missing mappings
- duplicate uploads
- OCR parsing edge cases
- complex audit requirements