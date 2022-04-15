from django.db import models
from .validators import validate_file_extension
from django.core.cache import cache
from django.utils.html import mark_safe

class SingletonModel(models.Model):

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super(SingletonModel, self).save(*args, **kwargs)
        self.set_cache()

    def delete(self, *args, **kwargs):
        pass

    def set_cache(self):
        cache.set(self.__class__.__name__, self)
    
    # def __str__(self):
    #     return self.main_title

    @classmethod
    def load(cls):
        if cache.get(cls.__name__) is None:
            obj, created = cls.objects.get_or_create(pk=1)
            if not created:
                obj.set_cache()
        return cache.get(cls.__name__)

class MainSettings(SingletonModel):
    title = models.CharField("Titulo", max_length=50, blank=False, default='Limpieza de Pozos Sépticos | Santa Cruz')
    meta = models.TextField("Meta Description", max_length=160, blank=True, default='')
    h1 = models.CharField("H1", max_length=100, blank=True, default='Limpieza de Pozos Sépticos')
    svg = models.FileField(upload_to='main/', validators=[validate_file_extension], default="")
    img = models.FileField(upload_to='main/', validators=[validate_file_extension], default="", blank=True)
    display = models.BooleanField("Display Webp", default=True)

    class Meta:
        verbose_name_plural = "Configuracion pagina Principal"
    
    @property
    def thumbnail_svg(self):
        if self.svg:
            return mark_safe('<img src="{}" width="150" height="100" />'.format(self.svg.url))
        return "No hay archivo svg"

    @property
    def thumbnail_img(self):
        if self.img:
            return mark_safe('<img src="{}" width="150" height="100" />'.format(self.img.url))
        return "No hay archivo webp"

class CotizaSettings(SingletonModel):
    title = models.CharField(max_length=50, blank=False, default='Limpieza de Pozos | Cotiza')
    meta = models.TextField(max_length=160, blank=True, default='')
    h1 = models.CharField(max_length=100, blank=True, default='Limpieza de Pozos Sépticos')
    textoCotiza = models.TextField(max_length=160, blank=False, default='Precio para limpieza de un pozo y cámara séptica de tipo vivienda.')

    class Meta:
        verbose_name_plural = "Configuracion pagina Cotiza"