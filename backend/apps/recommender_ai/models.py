#backend\apps\recommender_ai\models.py

from django.db import models
#from apps.users.models import User  
from django.conf import settings

from apps.products.models import Product

class Recommendation(models.Model):
    """
    Almacena productos recomendados para un usuario específico.
    """
    user = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name='recommendations',
    verbose_name="Usuario"
    )


    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name="Producto Recomendado")
    
    # Puntaje de relevancia (útil para ordenar)
    score = models.DecimalField(max_digits=5, decimal_places=2, verbose_name="Puntuación de Relevancia")
    
    # El tipo de recomendación ayuda a la lógica de la UI
    TYPE_CHOICES = [
        ('COLLAB', 'Filtro Colaborativo'),
        ('CONTENT', 'Basado en Contenido'),
        ('TREND', 'Tendencia General'),
    ]
    recommendation_type = models.CharField(max_length=10, choices=TYPE_CHOICES, verbose_name="Tipo de Recomendación")
    
    generated_at = models.DateTimeField(auto_now=True, verbose_name="Generado en")

    class Meta:
        verbose_name = "Recomendación"
        verbose_name_plural = "Recomendaciones"

    def __str__(self):
        return f"{self.user.username} - {self.product.name} ({self.recommendation_type})"

class SalesPrediction(models.Model):
    """
    Predicciones de demanda o venta generadas por un modelo de IA.
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='predictions', verbose_name="Producto")
    
    # Fecha o período para el que se hace la predicción
    period_start = models.DateField(verbose_name="Inicio del Período")
    predicted_quantity = models.PositiveIntegerField(verbose_name="Cantidad Predicha")
    
    generated_at = models.DateTimeField(auto_now_add=True, verbose_name="Generado en")

    class Meta:
        unique_together = ('product', 'period_start')
        verbose_name = "Predicción de Venta"
        verbose_name_plural = "Predicciones de Ventas"

    def __str__(self):
        return f"{self.product.name} - {self.period_start}: {self.predicted_quantity}"
