from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response


from .serializers import MainServicesSerializer, ServicesSerializer

from .models import Services

# Create your views here.
class ServicesRetrieveAPI(generics.RetrieveAPIView):

    lookup_field = 'slug'
    serializer_class =  ServicesSerializer
    queryset = Services.objects.all()

class MainServicesAPI(APIView):

    def get(self, request):
        services = Services.objects.filter(display_on_main=True)
        serializerServices = MainServicesSerializer(services, many=True)
        return Response(list(serializerServices.data))