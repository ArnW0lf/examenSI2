#backend\apps\inventory\models.py

from django.db import models
from apps.products.models import ProductVariant

class Stock(models.Model):
    """
    Representa el inventario actual de una variante de producto.
    """
    variant = models.OneToOneField(ProductVariant, on_delete=models.CASCADE, related_name='stock', verbose_name="Variante de Producto")
    quantity = models.PositiveIntegerField(default=0, verbose_name="Cantidad en Stock")
    last_updated = models.DateTimeField(auto_now=True, verbose_name="Última Actualización")
    
    # Umbral para notificaciones de bajo stock
    low_stock_threshold = models.PositiveIntegerField(default=5, verbose_name="Umbral de Alerta")

    class Meta:
        verbose_name = "Stock"
        verbose_name_plural = "Inventario"

    def __str__(self):
        return f"Stock de {self.variant.sku}: {self.quantity}"

class InventoryMovement(models.Model):
    """
    Registro de entradas y salidas de stock para auditoría.
    """
    MOVEMENT_TYPES = [
        ('IN', 'Entrada (Compra a Proveedor)'),
        ('OUT', 'Salida (Venta o Pérdida)'),
        ('ADJ', 'Ajuste de Inventario'),
    ]
    
    stock = models.ForeignKey(Stock, on_delete=models.PROTECT, related_name='movements', verbose_name="Stock Afectado")
    movement_type = models.CharField(max_length=3, choices=MOVEMENT_TYPES, verbose_name="Tipo de Movimiento")
    quantity_change = models.IntegerField(verbose_name="Cambio de Cantidad (+/-)")
    reason = models.TextField(blank=True, verbose_name="Razón del Movimiento")
    timestamp = models.DateTimeField(auto_now_add=True, verbose_name="Fecha/Hora")

    class Meta:
        verbose_name = "Movimiento de Inventario"
        verbose_name_plural = "Movimientos de Inventario"