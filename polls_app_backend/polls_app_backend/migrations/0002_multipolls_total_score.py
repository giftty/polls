# Generated by Django 4.1.5 on 2024-06-13 20:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls_app_backend', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='multipolls',
            name='total_score',
            field=models.CharField(default=0, max_length=50),
        ),
    ]
