# Generated by Django 4.0.3 on 2022-04-10 02:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapa', '0015_alter_cliente_cod_alter_cliente_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='user',
            field=models.CharField(choices=[('ADM', 'Administrador'), ('CLC', 'Cliente Confirma'), ('CLX', 'Cliente Cancela')], default='ADM', max_length=10, verbose_name='usuario'),
        ),
    ]
