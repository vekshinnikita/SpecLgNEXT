from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .tasks import send_order_mail


# Create your views here.

class SendOrder(APIView):

    def post(self, request):
        dict = request.data
        if dict.get('phone'):
            if len(dict.get('phone')) >= 18:
                send_order_mail.delay(dict)
                return Response(status=204)
        return Response(status=400)