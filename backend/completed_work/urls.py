from django.urls import path

from .views import WorkMainView, WorkListView, TagsListView

urlpatterns = [
    path('', WorkMainView.as_view()),
    path('list/', WorkListView.as_view()),
    path('tags/', TagsListView.as_view()),
]