from re import L
from unicodedata import name
from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Work, WorkTag

from .serializers import WorkListSerializers, WorkTagSerializers

# Create your views here.


class WorkMainView(ListAPIView):

    serializer_class = WorkListSerializers
    queryset = Work.objects.filter(draft=False)


class WorkListView(APIView):

    def get(self, request):
        tag = request.query_params.get('tag')

        if tag:
            try:
                tag_instance = WorkTag.objects.get(name=tag)
                queryset = Work.objects.filter(draft=False ,tags=tag_instance)
            except:
                queryset = None
        else:
            queryset = Work.objects.filter(draft=False)
        
        serializer = WorkListSerializers(queryset, many=True)

        return Response(serializer.data)


class TagsListView(ListAPIView):
    serializer_class = WorkTagSerializers
    queryset = WorkTag.objects.all()
    