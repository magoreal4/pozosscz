from .models import MainSettings, CotizaSettings

def settings(request):
    return {
        'setMain': MainSettings.load(),
        'setCotiza': CotizaSettings.load(),
        }