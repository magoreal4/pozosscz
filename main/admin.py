from django.contrib import admin
from .models import AQuien, Alcance
from django.utils.html import format_html

@admin.register(Alcance)
class AlcanceAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at',)
    list_display = (
        'id',
        'title',       
        'display',
        'order',
        'image_tag',
    )
    list_editable = (
        # 'description',
        'order','display'
    )
    list_display_links = ('title',)

    def image_tag(self, obj):
        return format_html('<img src="{}" width="50" height="50" />'.format(obj.svg.url))

# admin.site.register(Alcance, AlcanceAdmin)


class AQuienAdmin(admin.ModelAdmin):
    list_display = (
        'title',       
        'display',
        'order',
        'image_tag',
    )
    list_editable = (
        'order','display'
    )
    list_display_links = ('title',)

    def image_tag(self, obj):
        return format_html('<img src="{}" width="50" height="50" />'.format(obj.svg.url))

admin.site.register(AQuien, AQuienAdmin)

title = "Pozos SCZ"
subtitle = "Panel de Gestión"
admin.site.site_header = title
admin.site.site_title = title
admin.site.index_title = subtitle
