from rest_framework import serializers

from mapa.models import Cliente

class ClienteGet(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = (
            'id',
            'lat',
            'lon',
            'cost',
            'status',
            'user'
        )

class ClientePost(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = (
            'id',
            'lat',
            'lon',
            'cost',
            'status',
            'user'
        )