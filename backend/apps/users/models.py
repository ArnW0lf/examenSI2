#backend\apps\users\models.py

from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Modelo personalizado de usuario para Smart Boutique.
    """
    email = models.EmailField(unique=True)  #  Correo único
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)

    ROLE_CHOICES = [
        ('admin', 'Administrador'),
        ('employee', 'Empleado'),
        ('customer', 'Cliente'),
    ]
    # Definir el rol del usuario
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')

    profile_image = models.ImageField(upload_to='profiles/', blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    #  Login por email
    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'        # Este será el campo de autenticación
    REQUIRED_FIELDS = ['username']  # Username se mantiene para compatibilidad

    def __str__(self):
        return f"{self.username} ({self.role})"
