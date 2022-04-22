# Generated by Django 4.0.3 on 2022-04-12 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('settings_app', '0005_mainsettings_display_alter_mainsettings_svg'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cotizasettings',
            name='h1',
            field=models.CharField(blank=True, default='Limpieza de Pozos Sépticos', max_length=100),
        ),
        migrations.AlterField(
            model_name='cotizasettings',
            name='title',
            field=models.CharField(blank=True, default='Limpieza de Pozos | Santa Cruz', max_length=50),
        ),
        migrations.AlterField(
            model_name='mainsettings',
            name='display',
            field=models.BooleanField(default=True, verbose_name='Display Webp'),
        ),
        migrations.AlterField(
            model_name='mainsettings',
            name='h1',
            field=models.CharField(blank=True, default='Limpieza de Pozos Sépticos', max_length=100, verbose_name='H1'),
        ),
        migrations.AlterField(
            model_name='mainsettings',
            name='meta',
            field=models.TextField(default='', max_length=160, verbose_name='Meta Description'),
        ),
        migrations.AlterField(
            model_name='mainsettings',
            name='title',
            field=models.CharField(blank=True, default='Limpieza de Pozos | Santa Cruz', max_length=50, verbose_name='Titulo'),
        ),
    ]