from django.urls import path

from .views import (
    upload_file,
    emission_records
)

urlpatterns = [

    path(
        'upload/',
        upload_file
    ),

    path(
        'records/',
        emission_records
    ),

]