# Generated by Django 3.2.13 on 2022-04-24 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20220424_1610'),
    ]

    operations = [
        migrations.AddField(
            model_name='banner',
            name='alt',
            field=models.CharField(default='', max_length=50, verbose_name='alt'),
        ),
    ]
