from rest_framework import serializers
from .models import Employees, Phones, Emails

class PhonesSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Phones
        fields = '__all__'

class EmailsSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Emails
        fields = '__all__'

class EmployeesSerializer(serializers.ModelSerializer):
    class Meta: 
        telefonos = PhonesSerializer(many=True, read_only=True)
        correos = EmailsSerializer(many=True, read_only=True)
        
        model = Employees
        fields = '__all__'