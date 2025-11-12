#backend\apps\customers\models.py

from django.db import models
#from apps.users.models import User
from django.conf import settings 

class CustomerProfile(models.Model):
    """
    Información detallada del cliente, ligada al modelo User.
    """

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='customer_profile',
        verbose_name="Usuario"
    )

    # Preferencias generales
    receive_promotions = models.BooleanField(default=True, verbose_name="Recibir promociones y ofertas")
    preferred_size = models.CharField(max_length=10, blank=True, verbose_name="Talla preferida (e.g., M, L, XL)")
    style_preference = models.CharField(max_length=100, blank=True, verbose_name="Preferencia de estilo (e.g., Casual, Formal)")

    # Sistema de fidelización o engagement
    loyalty_points = models.PositiveIntegerField(default=0, verbose_name="Puntos de fidelidad")

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última actualización")

    class Meta:
        verbose_name = "Perfil del Cliente"
        verbose_name_plural = "Perfiles de Clientes"

    def __str__(self):
        return f"Perfil de {self.user.get_full_name() or self.user.email}"


class Address(models.Model):
    """
    Direcciones de envío y facturación del cliente.
    Un usuario puede tener varias direcciones.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='addresses',
        verbose_name="Usuario"
    )

    street = models.CharField(max_length=255, verbose_name="Calle y número")
    city = models.CharField(max_length=100, verbose_name="Ciudad")
    state = models.CharField(max_length=100, blank=True, null=True, verbose_name="Estado/Provincia")
    zip_code = models.CharField(max_length=20, verbose_name="Código postal")
    country = models.CharField(max_length=100, default="Bolivia", verbose_name="País")
    is_default = models.BooleanField(default=False, verbose_name="Dirección por defecto")

    class Meta:
        verbose_name = "Dirección"
        verbose_name_plural = "Direcciones"

    def __str__(self):
        return f"{self.street}, {self.city} ({self.user.username})"
