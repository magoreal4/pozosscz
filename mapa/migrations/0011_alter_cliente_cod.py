# Generated by Django 4.0.3 on 2022-04-08 14:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapa', '0010_alter_cliente_tel2'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='cod',
            field=models.IntegerField(blank=True, null=True, verbose_name='codigo'),
        ),
    ]
