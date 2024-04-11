from rest_framework import viewsets
from .serializer import EmployeesSerializer, PhonesSerializer, EmailsSerializer
from .models import Employees, Phones, Emails
from rest_framework.decorators import action
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.template.loader import render_to_string
import json

# Create your views here.
class EmployeesViewSet(viewsets.ModelViewSet):
    
    serializer_class = EmployeesSerializer
    queryset = Employees.objects.all()
    
    def create(self, request):
        json_data = json.loads(request.body)
        
        employe = Employees(**json_data)
        employe.save()
    
        
        res = EmployeesSerializer(employe, many = False)

        return Response(res.data)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)



class PhonesViewSet(viewsets.ModelViewSet):
    serializer_class = PhonesSerializer
    queryset = Phones.objects.all()
    
    def list(self, request, *args, **kwargs):
        parameters = {}
        parameters['empleadoId'] = request.GET.getlist('empleadoId')[0]
        
        queryset = Phones.objects.filter(**parameters)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    

class EmailsViewSet(viewsets.ModelViewSet):
    serializer_class = EmailsSerializer
    queryset = Emails.objects.all()
    
    def list(self, request, *args, **kwargs):
        parameters = {}
        parameters['empleadoId'] = request.GET.getlist('empleadoId')[0]
        
        queryset = Emails.objects.filter(**parameters)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    
    def create(self, request):
        json_data = json.loads(request.body)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        
        print(json_data)
        empleado = Employees.objects.get(pk=json_data["empleadoId"])
        
        subject = 'Bienvenido a la empresa'
        html_message = render_to_string('welcome_email.html', { 'names': empleado.names, 'lastnames': empleado.lastnames, 'post': empleado.post, 'function': empleado.function })

        message = 'Bienvenido a nuestra empresa'

        from_email = 'melaniediazj1102@gmail.com'
        recipient_list = [json_data['email']]

        send_mail(subject, message, from_email, recipient_list, html_message=html_message)
        
        #Enviar mensaje
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
