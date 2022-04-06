from rest_framework import serializers

from mapa.models import Cliente

class ClienteSerializers(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = (
            'id',
            'lat',
            'lon',
            'cost'
        )