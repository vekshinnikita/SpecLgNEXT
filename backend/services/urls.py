from django.urls import path

from .views import MainServicesAPI, ServicesRetrieveAPI


urlpatterns = [
    path('<slug:slug>', ServicesRetrieveAPI.as_view()),
    path('', MainServicesAPI.as_view())
]