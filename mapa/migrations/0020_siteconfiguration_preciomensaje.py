# Generated by Django 3.2.13 on 2022-04-25 22:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapa', '0019_siteconfiguration_ogimage'),
    ]

    operations = [
        migrations.AddField(
            model_name='siteconfiguration',
            name='precioMensaje',
            field=models.CharField(default='Precio de limpieza de camara y pozo séptico para vivienda', max_length=255),
        ),
    ]
