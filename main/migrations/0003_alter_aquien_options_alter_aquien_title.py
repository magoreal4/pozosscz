# Generated by Django 4.0.3 on 2022-04-02 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_aquien'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='aquien',
            options={'ordering': ['order'], 'verbose_name': 'Tipo de cliente', 'verbose_name_plural': 'Clientes'},
        ),
        migrations.AlterField(
            model_name='aquien',
            name='title',
            field=models.CharField(default='', max_length=50, verbose_name='cliente'),
        ),
    ]
