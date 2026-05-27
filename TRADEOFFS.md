# TRADEOFFS.md

## Tradeoffs

### 1. No Real SAP Integration

The prototype uses CSV uploads instead of real SAP APIs.

Reason:
Real SAP integrations require significant enterprise infrastructure and credentials.

---

### 2. No PDF OCR Parsing

Utility bill OCR parsing was intentionally skipped.

Reason:
OCR pipelines add complexity and are unreliable within the assignment timeline.

---

### 3. No Background Processing Queue

Uploads are processed synchronously.

Reason:
The prototype prioritizes simplicity and faster implementation.

In production, Celery or asynchronous workers would be added.