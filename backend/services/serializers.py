from rest_framework import serializers

from .models import Services

class ServicesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Services
        fields = '__all__'

class MainServicesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Services
        fields = ('slug', 'summary', 'title', "id", 'service_image')