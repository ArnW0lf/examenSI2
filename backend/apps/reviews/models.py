#backend\apps\reviews\models.py

from django.db import models
#from django.contrib.auth.models import User
from django.conf import settings

from apps.products.models import Product

class Review(models.Model):
    """
    Valoración y comentario de un cliente sobre un producto.
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews', verbose_name="Producto")
    
    user = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name='reviews',
    verbose_name="Cliente"
    )

    
    rating = models.PositiveSmallIntegerField(
        choices=[(i, str(i)) for i in range(1, 6)],
        verbose_name="Puntuación"
    )
    comment = models.TextField(blank=True, verbose_name="Comentario")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Creación")
    is_approved = models.BooleanField(default=False, verbose_name="Aprobado por Moderador")

    class Meta:
        unique_together = ('product', 'user')  # Un usuario puede dejar una reseña por producto
        ordering = ['-created_at']
        verbose_name = "Valoración"
        verbose_name_plural = "Valoraciones"

    def __str__(self):
        return f"{self.user.username} - {self.product.name} ({self.rating}⭐)"
