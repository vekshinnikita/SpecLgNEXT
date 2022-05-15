from rest_framework import serializers
from .models import *


class WorkShotsSerializers(serializers.ModelSerializer):

    class Meta:
        model = WorkShots
        fields = ("id", "url_image",)

class WorkListSerializers(serializers.ModelSerializer):
    shots = WorkShotsSerializers(read_only=True, many=True)

    class Meta:
        model = Work
        exclude = ("draft", 'slug', 'description')