from django.urls import path

from .views import SendOrder

urlpatterns = [
    path('', SendOrder.as_view())
]