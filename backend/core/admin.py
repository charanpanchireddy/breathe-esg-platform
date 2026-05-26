from django.contrib import admin

from .models import (
    Organization,
    UploadedFile,
    RawRecord,
    EmissionRecord,
    AuditLog
)


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


@admin.register(UploadedFile)
class UploadedFileAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'organization',
        'source_type',
        'uploaded_by',
        'uploaded_at'
    )


@admin.register(RawRecord)
class RawRecordAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'uploaded_file',
        'created_at'
    )


@admin.register(EmissionRecord)
class EmissionRecordAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'activity',
        'quantity',
        'unit',
        'emissions',
        'status'
    )


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'action',
        'user',
        'timestamp'
    )