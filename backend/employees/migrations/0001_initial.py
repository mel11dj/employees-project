# Generated by Django 5.0.4 on 2024-04-11 21:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Employees',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('names', models.CharField(max_length=100)),
                ('lastnames', models.CharField(max_length=100)),
                ('typeIdentification', models.CharField(choices=[('nit', 'NIT'), ('cc', 'Cedula')], max_length=3)),
                ('numberIdentification', models.CharField(max_length=20)),
                ('dateIncome', models.DateField()),
                ('salaryMonthly', models.DecimalField(decimal_places=2, max_digits=10)),
                ('post', models.CharField(max_length=100)),
                ('function', models.CharField(max_length=500)),
                ('department', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Emails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('empleadoId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='employees.employees')),
            ],
        ),
        migrations.CreateModel(
            name='Phones',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('cell', 'Celular'), ('Tel', 'Telefono')], max_length=4)),
                ('number', models.CharField(max_length=15)),
                ('indicative', models.CharField(max_length=5)),
                ('empleadoId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='employees.employees')),
            ],
        ),
    ]