from django.db import models

# Create your models here.
class Employees(models.Model):
    names = models.CharField(max_length=100)
    lastnames = models.CharField(max_length=100)
    typeIdentification = models.CharField(max_length=3, choices=[('nit', 'NIT'), ('cc', 'Cedula')])
    numberIdentification = models.CharField(max_length=20)
    dateIncome = models.DateField()
    salaryMonthly = models.DecimalField(max_digits=10, decimal_places=2)
    post = models.CharField(max_length=100)
    function = models.CharField(max_length=500)
    department = models.CharField(max_length=100)

class Phones(models.Model):
    TYPE = choices= [('cell', 'Celular'), ('Tel', 'Telefono')]
    type = models.CharField(max_length=4, choices=TYPE) 
    number = models.CharField(max_length=15)
    indicative = models.CharField(max_length=5)
    empleadoId = models.ForeignKey(Employees, on_delete=models.CASCADE)

class Emails(models.Model):
    empleadoId = models.ForeignKey(Employees, on_delete=models.CASCADE)
    email = models.EmailField()
 