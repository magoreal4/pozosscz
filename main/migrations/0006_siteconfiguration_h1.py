# Generated by Django 3.2.13 on 2022-04-24 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_banner_alt'),
    ]

    operations = [
        migrations.AddField(
            model_name='siteconfiguration',
            name='h1',
            field=models.CharField(default='Limpieza de pozos sépticos', max_length=255),
        ),
    ]
