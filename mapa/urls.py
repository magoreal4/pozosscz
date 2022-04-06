from django.urls import path
from . import views

app_name = "mapa_app"

urlpatterns = [
    path('', views.Cotiza.as_view(), name='Cotiza'),
    path('admin/', views.CotizaAdmin.as_view(), name='Cotiza-Admin'),
    path('api/cliente/list/', views.ClienteListApiView.as_view()),
]
