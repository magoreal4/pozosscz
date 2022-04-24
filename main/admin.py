from django.contrib import admin
from .models import AQuien, Alcance, Banner
from django.utils.html import format_html

from solo.admin import SingletonModelAdmin
from .models import SiteConfiguration

title = "Pozos SCZ"
subtitle = "Panel de Gestión"
admin.site.site_header = title
admin.site.site_title = title
admin.site.index_title = subtitle

admin.site.register(SiteConfiguration, SingletonModelAdmin)

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    # readonly_fields = ('created_at',)
    list_display = (
        'id',
        'displayBanner',
        'thumbnail_svg',       
        'thumbnail_img',
        'displayWebp',
    )
    list_editable = (
        'displayBanner',
        'displayWebp',
    )
    def thumbnail_svg(self, obj):
        return obj.thumbnail_svg
    
    def thumbnail_img(self, obj):
        return obj.thumbnail_img

    thumbnail_svg.short_description = 'Imagen Fondo SVG'
    thumbnail_img.short_description = 'Imagen Webp'
    # thumbnail_img.allow_tags = True


@admin.register(Alcance)
class AlcanceAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at',)
    list_display = (
        'id',
        'title',       
        'display',
        'order',
        'thumbnail_preview',
    )
    list_editable = (
        'order','display'
    )
    list_display_links = ('title',)

    def thumbnail_preview(self, obj):
        return obj.thumbnail_preview

    thumbnail_preview.short_description = 'Thumbnail Preview'
    thumbnail_preview.allow_tags = True

class AQuienAdmin(admin.ModelAdmin):
    list_display = (
        'title',       
        'display',
        'order',
        'thumbnail_preview',
    )
    list_editable = (
        'order','display'
    )
    list_display_links = ('title',)

    readonly_fields = ('thumbnail_preview',)

    def thumbnail_preview(self, obj):
        return obj.thumbnail_preview

    thumbnail_preview.short_description = 'Thumbnail Preview'
    thumbnail_preview.allow_tags = True

    # def image_tag(self, obj):
    #     return format_html('<img src="{}" width="50" height="50" />'.format(obj.svg.url))

admin.site.register(AQuien, AQuienAdmin)

