
from django.views.generic import TemplateView
from main.models import AQuien, Alcance

class Home(TemplateView):
    template_name = "home.html"

    def get_context_data(self, **kwargs):
        alcance = Alcance.objects.all()
        quienes = AQuien.objects.all()
        return {'descripciones': alcance, 'quienes': quienes}