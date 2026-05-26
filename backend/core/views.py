from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework import status

from .models import (
    UploadedFile,
    Organization,
    EmissionRecord
)

from .serializers import EmissionRecordSerializer

from .services import process_uploaded_file


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_file(request):

    file = request.FILES.get('file')

    source_type = request.data.get('source_type')

    if not file:
        return Response(
            {'error': 'No file uploaded'},
            status=status.HTTP_400_BAD_REQUEST
        )

    organization, _ = Organization.objects.get_or_create(
        name='Demo Company'
    )

    uploaded_file = UploadedFile.objects.create(
        organization=organization,
        file=file,
        source_type=source_type,
        uploaded_by=request.user
    )

    process_uploaded_file(uploaded_file)

    return Response({
        'message': 'File uploaded successfully'
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def emission_records(request):

    records = EmissionRecord.objects.all().order_by('-id')

    serializer = EmissionRecordSerializer(
        records,
        many=True
    )

    return Response(serializer.data)