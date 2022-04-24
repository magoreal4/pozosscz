from django.db import models
from .validators import validate_file_extension
from django.utils.html import mark_safe
from solo.models import SingletonModel

class Banner(models.Model):
    svg = models.FileField(upload_to='main/', validators=[validate_file_extension], default="")
    img = models.FileField(upload_to='main/', validators=[validate_file_extension], default="", blank=True)
    alt = models.CharField("alt", default="", max_length=50)
    displayWebp = models.BooleanField("Mostrar Webp", default=True)
    displayBanner = models.BooleanField("Mostrar Banner", default=False)

    class Meta:
        verbose_name = "Banner"
        verbose_name_plural = "Banner"
        ordering = ['displayBanner'] 

    @property
    def thumbnail_svg(self):
        if self.svg:
            return mark_safe('<img src="{}" style="background-color: white;" width="250" height="150" />'.format(self.svg.url))
        return "No hay archivo svg"

    @property
    def thumbnail_img(self):
        if self.img:
            return mark_safe('<img src="{}" width="250" height="150" />'.format(self.img.url))
        return "No hay archivo webp"


class Alcance(models.Model): # Tabla con nombre Alcance
    title = models.CharField("titulo", default="", max_length=50)
    description = models.TextField("contenido", max_length=250, default="", blank=True)
    svg = models.FileField(upload_to='icon/', validators=[validate_file_extension], default="", blank=True)
    display = models.BooleanField(default=True)
    order = models.IntegerField("order", default=0)
    created_at = models.DateTimeField("Creado", auto_now_add=True)

    class Meta:
        verbose_name = "Servicio"
        verbose_name_plural = "Nuestros Servicios"
        ordering = ['order'] 
    
    def __str__(self):
        return self.title

    @property
    def thumbnail_preview(self):
        if self.svg:
            return mark_safe('<img src="{}" width="30" height="30" />'.format(self.svg.url))
        return ""


class AQuien(models.Model): 
    title = models.CharField("cliente", default="", max_length=50)
    svg = models.FileField(upload_to='icon/', validators=[validate_file_extension], default="", blank=True)
    display = models.BooleanField(default=True)
    order = models.IntegerField("order", default=0)
    
    class Meta:
        verbose_name = "Tipo de cliente"
        verbose_name_plural = "Tipos de Cliente"
        ordering = ['order'] 
    
    def __str__(self):
        return self.title

    @property
    def thumbnail_preview(self):
        if self.svg:
            return mark_safe('<img src="{}" width="30" height="30" />'.format(self.svg.url))
        return ""

class SiteConfiguration(SingletonModel):
    title = models.CharField(max_length=70, default='Limpieza de Pozos | Santa Cruz')
    h1 = models.CharField(max_length=255, default='Limpieza de pozos sépticos')
    metaDescription = models.TextField(max_length=300, default='', blank=True )
    # def __str__(self):
    #     return "Configuración"

    class Meta:
        verbose_name = "Configuración"