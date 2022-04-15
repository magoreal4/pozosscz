from django.contrib import admin
from .models import MainSettings, CotizaSettings
from django.utils.html import format_html

class SingletonModelAdmin(admin.ModelAdmin):

    actions = None # Removes the default delete action.
 
    # def has_delete_permission(self, request, obj=None):
    #     return False
 
    # def has_add_permission(self, request):
    #     return False
 
@admin.register(MainSettings)
class MainSettingsAdmin(SingletonModelAdmin):
    list_display = ("title", "meta", "h1", "thumbnail_svg", "thumbnail_img", "display")
    list_editable = ("meta", "h1", "display")

    def thumbnail_svg(self, obj):
        return obj.thumbnail_svg
    
    def thumbnail_img(self, obj):
        return obj.thumbnail_img

    thumbnail_svg.short_description = 'Imagen Fondo SVG'
    thumbnail_img.short_description = 'Imagen Webp'
    # thumbnail_svg.allow_tags = True

@admin.register(CotizaSettings)
class CotizaSettingsAdmin(SingletonModelAdmin):
    list_display = ("title", "h1", "textoCotiza")
    list_editable = ("h1", "textoCotiza")











