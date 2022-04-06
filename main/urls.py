from django.urls import path
from main import views

app_name = "main_app"

urlpatterns = [
    path('', views.Home.as_view(), name='Home'),
]
