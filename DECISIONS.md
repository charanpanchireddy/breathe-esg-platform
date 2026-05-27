# DECISIONS.md

## Key Decisions

### Why CSV Uploads

CSV uploads were selected because they are realistic for enterprise onboarding workflows and easier to prototype within the assignment timeline.

---

### SAP Source Choice

I chose flat-file CSV style SAP exports because many enterprise teams export SAP data into spreadsheets for operational review.

I intentionally avoided deep SAP integrations such as IDoc or BAPI due to assignment scope.

---

### Utility Data Choice

I chose utility portal CSV exports instead of PDF parsing because utility teams commonly export billing data into spreadsheets.

PDF OCR parsing was considered out of scope.

---

### Travel Data Choice

Travel data was modeled after platforms like Concur and Navan.

The prototype assumes travel activity exports already contain trip-level details.

---

### Suspicious Record Handling

Instead of automatically rejecting bad records, suspicious records are flagged for analyst review.

This mirrors real ESG audit workflows.

---

### Authentication Choice

JWT authentication was used because it works well for REST APIs and frontend/backend separation.

---

## Questions I Would Ask The PM

- How strict should suspicious detection rules be?
- Should uploads support rollback?
- How should tenant separation work?
- What level of audit logging is legally required?
- Should analysts be allowed to edit uploaded data?