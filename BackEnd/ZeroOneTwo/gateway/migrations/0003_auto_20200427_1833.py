# Generated by Django 3.0.5 on 2020-04-27 09:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gateway', '0002_auto_20200427_1344'),
    ]

    operations = [
        migrations.AddField(
            model_name='boards',
            name='entry',
            field=models.ManyToManyField(related_name='boards', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='boards',
            name='register',
            field=models.ForeignKey(db_column='register', on_delete=django.db.models.deletion.DO_NOTHING, related_name='board_register', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='receipts',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images'),
        ),
    ]
