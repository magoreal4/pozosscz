
from django.views.generic import TemplateView, ListView
from .models import Cliente
from rest_framework.generics import ListAPIView
from .serializers import ClienteSerializers

class Cotiza(TemplateView):
    template_name = "cotiza.html"

class CotizaAdmin(ListView):
    template_name = "cotiza-admin.html"
    context_object_name = 'clientes'

    def get_queryset(self):
        return Cliente.objects.all()

class ClienteListApiView(ListAPIView):

    serializer_class = ClienteSerializers

    def get_queryset(self):
        return Cliente.objects.all()