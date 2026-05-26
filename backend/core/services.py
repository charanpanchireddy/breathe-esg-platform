import pandas as pd

from .models import RawRecord, EmissionRecord, AuditLog


def process_uploaded_file(uploaded_file):

    df = pd.read_csv(uploaded_file.file.path)

    for _, row in df.iterrows():

        raw_data = row.to_dict()

        RawRecord.objects.create(
            uploaded_file=uploaded_file,
            raw_data=raw_data
        )

        try:
            quantity = float(row.get('quantity', 0))
        except:
            quantity = 0

        emissions = quantity * 2.5

        status = 'Pending'

        if quantity <= 0:
            status = 'Suspicious'

        if quantity > 10000:
            status = 'Suspicious'

        record = EmissionRecord.objects.create(
            organization=uploaded_file.organization,
            scope=row.get('scope', 'Scope 1'),
            category=row.get('category', 'Fuel'),
            activity=row.get('activity', 'Unknown'),
            quantity=quantity,
            unit=row.get('unit', 'liters'),
            emissions=emissions,
            status=status
        )
        AuditLog.objects.create(
            action=f"{status} emission record created",
            user=uploaded_file.uploaded_by,
            emission_record=record
        )