
from django.views.generic import TemplateView, ListView

from .models import Cliente
from rest_framework.generics import ListAPIView, CreateAPIView
from .serializers import ClienteGet, ClientePost
from django.conf import settings

class Mapa(TemplateView):
    template_name = "mapa.html"
    extra_context = {'debug': settings.DEBUG}

class MapaAdmin(ListView):
    template_name = "mapa-admin.html"
    model = Cliente
    extra_context = {'debug': settings.DEBUG}

class ClienteListApiView(ListAPIView):
    serializer_class = ClienteGet

    def get_queryset(self):
        return Cliente.objects.all()

class ClienteCreateApiView(CreateAPIView):
    serializer_class = ClientePost
