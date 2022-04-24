# Generated by Django 3.2.13 on 2022-04-24 16:10

from django.db import migrations, models
import main.validators


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_auto_20220424_0326'),
    ]

    operations = [
        migrations.CreateModel(
            name='Banner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('svg', models.FileField(default='', upload_to='main/', validators=[main.validators.validate_file_extension])),
                ('img', models.FileField(blank=True, default='', upload_to='main/', validators=[main.validators.validate_file_extension])),
                ('displayWebp', models.BooleanField(default=True, verbose_name='Mostrar Webp')),
                ('displayBanner', models.BooleanField(default=False, verbose_name='Mostrar Banner')),
            ],
            options={
                'verbose_name': 'Banner',
                'verbose_name_plural': 'Banner',
                'ordering': ['displayBanner'],
            },
        ),
        migrations.AlterModelOptions(
            name='alcance',
            options={'ordering': ['order'], 'verbose_name': 'Servicio', 'verbose_name_plural': 'Nuestros Servicios'},
        ),
        migrations.AlterModelOptions(
            name='aquien',
            options={'ordering': ['order'], 'verbose_name': 'Tipo de cliente', 'verbose_name_plural': 'Tipos de Cliente'},
        ),
        migrations.AlterModelOptions(
            name='siteconfiguration',
            options={'verbose_name': 'Configuración'},
        ),
    ]