from django.db import models

ESTADO_CLIENTE_CHOICES = [
    ('COT', 'Cotizado'),
    ('EJE', 'Ejecutado'),
    ('NEG', 'L.negra'),
]
TIPO_SERVICIO_CHOICES = [
    ('NOR', 'Normal'),
    ('FLE', 'Flete'),
    ('RRP', 'RRPP'),
    ('FBA', 'FB Ads'),
    ('ORG', 'Orgánico'),
    ('GOA', 'Google Ads'),
    ('COM', 'Combo'),
    ('MKP', 'Market Place'),
    ('OTR', 'Otro'),
]
class Cliente(models.Model):
    tel1 = models.CharField("telefono 1", max_length=8, blank=True, null=True)
    tel2 = models.CharField("telefono 2", max_length=12, blank=True)
    name = models.CharField("nombre", max_length=51, blank=True)
    address = models.CharField("direccion", max_length=120, blank=True)
    cod = models.IntegerField("codigo", blank=True)
    cost = models.IntegerField("precio", default=0)
    service = models.CharField("servicio", max_length=10, choices=TIPO_SERVICIO_CHOICES, default='NOR')
    lat = models.FloatField("latitud", max_length=10)
    lon = models.FloatField("longitud", max_length=10)    
    status = models.CharField("estado", max_length=10, choices=ESTADO_CLIENTE_CHOICES, default='COT')
    created_at = models.DateTimeField("creado", auto_now_add=True)

    class Meta:
        verbose_name = "Cliente"
        verbose_name_plural = "Cientes"
        # ordering = ['created_at'] 

    # def __str__(self):
    #     return self.tel1