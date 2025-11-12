#backend\apps\payments\models.py

from django.db import models
from apps.orders.models import Order

class Payment(models.Model):
    """
    Registro de una transacción de pago realizada.
    """
    METHOD_CHOICES = [
        ('STRIPE', 'Stripe'),
        ('PAYPAL', 'PayPal'),
        ('MP', 'Mercado Pago'),
    ]

    order = models.OneToOneField(Order, on_delete=models.PROTECT, related_name='payment', verbose_name="Pedido Asociado")
    method = models.CharField(max_length=50, choices=METHOD_CHOICES, verbose_name="Método de Pago")
    amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Monto Pagado")
    transaction_id = models.CharField(max_length=255, unique=True, verbose_name="ID de Transacción de la Pasarela")
    is_successful = models.BooleanField(default=False, verbose_name="Pago Exitoso")
    payment_date = models.DateTimeField(auto_now_add=True, verbose_name="Fecha del Pago")

    class Meta:
        verbose_name = "Pago"
        verbose_name_plural = "Pagos"