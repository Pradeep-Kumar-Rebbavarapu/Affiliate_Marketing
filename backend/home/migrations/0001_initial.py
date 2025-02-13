# Generated by Django 5.1.2 on 2025-02-10 11:31

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductLinks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=100)),
                ('product_link', models.URLField()),
                ('product_platform', models.CharField(max_length=100)),
                ('product_image', models.ImageField(blank=True, null=True, upload_to='product_images/')),
                ('product_price', models.DecimalField(decimal_places=2, default=100.0, max_digits=10)),
                ('product_description', models.TextField(blank=True)),
                ('product_country', models.CharField(default='India', max_length=100)),
                ('product_category', models.CharField(default='none', max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='UserLists',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=200, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_lists', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hobbies', models.TextField(blank=True, null=True)),
                ('age', models.IntegerField(blank=True, null=True)),
                ('recommended_products', models.ManyToManyField(blank=True, related_name='recommended_to_users', to='home.productlinks')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
