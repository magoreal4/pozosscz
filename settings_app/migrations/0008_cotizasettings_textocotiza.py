# Generated by Django 4.0.3 on 2022-04-12 17:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('settings_app', '0007_alter_cotizasettings_meta_alter_cotizasettings_title_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='cotizasettings',
            name='textoCotiza',
            field=models.TextField(default='Precio para limpieza de un pozo y cámara séptica de tipo vivienda.', max_length=160),
        ),
    ]