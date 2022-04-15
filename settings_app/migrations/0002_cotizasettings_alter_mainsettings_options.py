# Generated by Django 4.0.3 on 2022-04-12 00:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('settings_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CotizaSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cotiza_title', models.CharField(blank=True, default='Limpieza de Pozos | Santa Cruz', max_length=20)),
                ('cotiza_h1', models.CharField(blank=True, default='Limpieza de Pozos Sépticos', max_length=20)),
            ],
            options={
                'verbose_name_plural': 'Configuracion pagina Cotiza',
            },
        ),
        migrations.AlterModelOptions(
            name='mainsettings',
            options={'verbose_name_plural': 'Configuracion pagina Principal'},
        ),
    ]
