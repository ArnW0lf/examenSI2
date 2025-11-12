#backend\apps\promotions\models.py

from django.db import models
from django.utils import timezone
#from apps.users.models import User
from django.conf import settings

from apps.products.models import Product


class Coupon(models.Model):
    """
    Representa un código de descuento que los clientes pueden aplicar al checkout.
    """
    code = models.CharField(max_length=50, unique=True, verbose_name="Código del cupón")

    # Tipo de descuento
    DISCOUNT_TYPES = [
        ('PERCENTAGE', 'Porcentaje'),
        ('FIXED', 'Monto fijo'),
    ]
    discount_type = models.CharField(max_length=10, choices=DISCOUNT_TYPES, verbose_name="Tipo de descuento")
    value = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Valor del descuento")

    # Restricciones y fechas
    minimum_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0.00,
        verbose_name="Monto mínimo requerido"
    )
    valid_from = models.DateTimeField(verbose_name="Válido desde")
    valid_to = models.DateTimeField(verbose_name="Válido hasta")
    max_uses = models.PositiveIntegerField(null=True, blank=True, verbose_name="Usos máximos")
    uses_count = models.PositiveIntegerField(default=0, verbose_name="Usos actuales")

    # Usuario que creó el cupón (opcional)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='created_coupons',
        verbose_name="Creado por"
    )


    is_active = models.BooleanField(default=True, verbose_name="Activo")

    class Meta:
        verbose_name = "Cupón"
        verbose_name_plural = "Cupones"

    def __str__(self):
        return self.code

    # 🔹 Método útil para lógica de negocio
    def is_valid(self):
        """Verifica si el cupón sigue vigente y disponible."""
        now = timezone.now()
        return (
            self.is_active and
            self.valid_from <= now <= self.valid_to and
            (self.max_uses is None or self.uses_count < self.max_uses)
        )


class Promotion(models.Model):
    """
    Promociones generales aplicables a productos o a toda la tienda.
    """
    name = models.CharField(max_length=255, verbose_name="Nombre de la promoción")
    description = models.TextField(blank=True, verbose_name="Descripción")
    
    # Si está vacío, aplica a todos los productos
    products = models.ManyToManyField(Product, blank=True, related_name='promotions', verbose_name="Productos incluidos")

    discount_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="Descuento (%)"
    )
    free_shipping = models.BooleanField(default=False, verbose_name="Envío gratis")

    start_date = models.DateTimeField(verbose_name="Fecha de inicio")
    end_date = models.DateTimeField(verbose_name="Fecha de fin")
    is_active = models.BooleanField(default=True, verbose_name="Activa")

    class Meta:
        verbose_name = "Promoción"
        verbose_name_plural = "Promociones"

    def __str__(self):
        return self.name

    def is_currently_active(self):
        """Verifica si la promoción está vigente actualmente."""
        now = timezone.now()
        return self.is_active and self.start_date <= now <= self.end_date
