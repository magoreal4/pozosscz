# Generated by Django 4.0.3 on 2022-04-03 02:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapa', '0002_cliente_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='tel',
            field=models.CharField(max_length=100, verbose_name='tel'),
        ),
    ]
