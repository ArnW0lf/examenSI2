#backend\apps\orders\models.py

from django.db import models
#from apps.users.models import User
from django.conf import settings
from apps.products.models import ProductVariant

class Cart(models.Model):
    """
    Carrito de compras activo de un usuario.
    Puede pertenecer a un usuario registrado o a una sesión anónima.
    """
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='cart',
        null=True,
        blank=True,
        verbose_name="Usuario"
    )

    session_key = models.CharField(
        max_length=40,
        null=True,
        blank=True,
        verbose_name="Clave de Sesión (para invitados)"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última actualización")

    class Meta:
        verbose_name = "Carrito"
        verbose_name_plural = "Carritos"

    def __str__(self):
        return f"Carrito de {self.user.email if self.user else 'Invitado'}"


class CartItem(models.Model):
    """
    Artículos dentro del carrito.
    """
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items', verbose_name="Carrito")
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, verbose_name="Variante de producto")
    quantity = models.PositiveIntegerField(default=1, verbose_name="Cantidad")

    class Meta:
        unique_together = ('cart', 'variant')
        verbose_name = "Artículo del carrito"
        verbose_name_plural = "Artículos del carrito"

    def __str__(self):
        return f"{self.variant} × {self.quantity}"


class Order(models.Model):
    """
    Pedido confirmado o completado.
    """
    STATUS_CHOICES = [
        ('PENDING', 'Pendiente de pago'),
        ('PROCESSING', 'En proceso'),
        ('SHIPPED', 'Enviado'),
        ('DELIVERED', 'Entregado'),
        ('CANCELLED', 'Cancelado'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='orders',
        verbose_name="Cliente"
    )

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING', verbose_name="Estado del pedido")
    order_date = models.DateTimeField(auto_now_add=True, verbose_name="Fecha del pedido")
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Monto total")
    shipping_address = models.TextField(verbose_name="Dirección de envío")
    payment_transaction_id = models.CharField(max_length=255, blank=True, null=True, verbose_name="ID de transacción")

    class Meta:
        ordering = ['-order_date']
        verbose_name = "Pedido"
        verbose_name_plural = "Pedidos"

    def __str__(self):
        return f"Pedido #{self.id} - {self.user.email if self.user else 'Invitado'}"


class OrderItem(models.Model):
    """
    Artículos vendidos en un pedido.
    """
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items', verbose_name="Pedido")
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.PROTECT, verbose_name="Variante de producto")
    quantity = models.PositiveIntegerField(verbose_name="Cantidad")
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Precio unitario al momento de la compra")

    class Meta:
        verbose_name = "Artículo del pedido"
        verbose_name_plural = "Artículos del pedido"

    def __str__(self):
        return f"{self.product_variant} × {self.quantity}"
