from import_export import resources
from import_export.admin import ImportExportModelAdmin

from django.contrib import admin
from mapa.models import Cliente

class ClienteResource(resources.ModelResource):
    fields = (
        # 'id',
        'tel1',
        'tel2',
        'name',
        'address',
        'cod',
        'cost',
        'service',       
        'lat',
        'lon',
        'status',
        'created_at'
    )
    class Meta:
        model = Cliente


@admin.register(Cliente)
class ClienteAdmin(ImportExportModelAdmin):
    resource_class = ClienteResource
    readonly_fields = ('created_at',)
    list_display = (
        'id',
        'name',
        'tel1',
        'tel2',
        'address',
        'cod',
        'cost',
        'service',       
        'lat',
        'lon',
        'status',
        'created_at'
    )
    list_editable = (
        'tel2','status'
    )
    list_display_links = ('id', 'name')


