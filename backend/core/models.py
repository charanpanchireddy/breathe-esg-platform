from django.db import models
from django.contrib.auth.models import User


class Organization(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class UploadedFile(models.Model):
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE
    )

    file = models.FileField(upload_to='uploads/')
    source_type = models.CharField(max_length=100)

    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.source_type} - {self.organization.name}"


class RawRecord(models.Model):

    uploaded_file = models.ForeignKey(
        UploadedFile,
        on_delete=models.CASCADE
    )

    raw_data = models.JSONField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Raw Record {self.id}"


class EmissionRecord(models.Model):

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE
    )

    scope = models.CharField(max_length=50)

    category = models.CharField(max_length=100)

    activity = models.CharField(max_length=255)

    quantity = models.FloatField()

    unit = models.CharField(max_length=50)

    emissions = models.FloatField()

    status = models.CharField(
        max_length=50,
        default='Pending'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.activity} - {self.emissions} kg CO2"


class AuditLog(models.Model):

    action = models.CharField(max_length=255)

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    emission_record = models.ForeignKey(
        EmissionRecord,
        on_delete=models.CASCADE
    )

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.action