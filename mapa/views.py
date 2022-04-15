
from django.views.generic import TemplateView, ListView

from .models import Cliente
from rest_framework.generics import ListAPIView, CreateAPIView
from .serializers import ClienteGet, ClientePost

class Mapa(TemplateView):
    template_name = "mapa.html"

class MapaAdmin(ListView):
    template_name = "mapa-admin.html"
    model = Cliente

class ClienteListApiView(ListAPIView):
    serializer_class = ClienteGet

    def get_queryset(self):
        return Cliente.objects.all()

class ClienteCreateApiView(CreateAPIView):
    serializer_class = ClientePost
