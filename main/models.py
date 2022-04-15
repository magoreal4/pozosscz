from django.db import models
from .validators import validate_file_extension
from django.utils.html import mark_safe

class Alcance(models.Model): # Tabla con nombre Alcance
    title = models.CharField("titulo", default="", max_length=50)
    description = models.TextField("contenido", max_length=250, default="", blank=True)
    svg = models.FileField(upload_to='icon/', validators=[validate_file_extension], default="", blank=True)
    display = models.BooleanField(default=True)
    order = models.IntegerField("order", default=0)
    created_at = models.DateTimeField("Creado", auto_now_add=True)

    class Meta:
        verbose_name = "Alcance"
        verbose_name_plural = "Alcances"
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
        verbose_name_plural = "Clientes"
        ordering = ['order'] 
    
    def __str__(self):
        return self.title

    @property
    def thumbnail_preview(self):
        if self.svg:
            return mark_safe('<img src="{}" width="30" height="30" />'.format(self.svg.url))
        return ""
