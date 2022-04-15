# Generated by Django 4.0.3 on 2022-04-08 16:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapa', '0012_cliente_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='user',
            field=models.CharField(choices=[('ADM', 'Administradores'), ('CLC', 'Cliente Confirmar'), ('CLX', 'Cliente Cancelar')], default='ADM', max_length=10, verbose_name='usuario'),
        ),
    ]
