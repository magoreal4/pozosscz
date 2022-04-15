from django.urls import path
from . import views

app_name = "mapa_app"

urlpatterns = [
    path('', views.Mapa.as_view(), name='Mapa'),
    path('admin/', views.MapaAdmin.as_view(), name='Mapa-Admin'),
    path('api/cliente/list/', views.ClienteListApiView.as_view()),
    path('api/cliente/create/', views.ClienteCreateApiView.as_view()),
]
