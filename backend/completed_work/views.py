from re import L
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Work

from .serializers import WorkListSerializers

# Create your views here.


class WorkListView(APIView):

    def get(self,response):
        queryset = Work.objects.filter(draft=False)

        serializer = WorkListSerializers(queryset, many=True)

        return Response(serializer.data[::-1])



        