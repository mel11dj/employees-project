from django.urls import path, include
from rest_framework.routers import DefaultRouter
from employees import views

router = DefaultRouter()
router.register(r'employees', views.EmployeesViewSet)
router.register(r'phones', views.PhonesViewSet)
router.register(r'emails', views.EmailsViewSet)

urlpatterns = [
    path('', include(router.urls)), 
]