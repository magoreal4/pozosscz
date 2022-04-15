
from django.views.generic import TemplateView
from main.models import AQuien, Alcance
from settings_app.models import MainSettings


class Home(TemplateView):
    template_name = "home.html"

    def get_context_data(self, **kwargs):
        alcance = Alcance.objects.all()
        quienes = AQuien.objects.all()
        title = MainSettings.objects.get(pk=1).title
        return {'descripciones': alcance, 'quienes': quienes, 'titulo':title}