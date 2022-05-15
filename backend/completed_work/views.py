from re import L
from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .models import Work

from .serializers import WorkListSerializers

# Create your views here.


class WorkListView(ListAPIView):

    serializer_class = WorkListSerializers
    queryset = Work.objects.filter(draft=False)