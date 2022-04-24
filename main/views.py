
from django.views.generic import TemplateView
from main.models import AQuien, Alcance, Banner

class Home(TemplateView):
    template_name = "home.html"

    def get_context_data(self, **kwargs):
        alcance = Alcance.objects.all()
        quienes = AQuien.objects.all()
        banner = Banner.objects.filter(displayBanner=True)
        # title = MainSettings.objects.get(pk=1).title
        # title = "hola"
        return {'descripciones': alcance, 'quienes': quienes, 'banner':banner}