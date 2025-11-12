#backend\apps\categories\models.py

from django.db import models

class Category(models.Model):
    """
    Modelo para organizar los productos en categorías (e.g., Camisetas, Vestidos, Accesorios).
    """
    name = models.CharField(max_length=100, unique=True, verbose_name="Nombre de la Categoría")
    slug = models.SlugField(max_length=100, unique=True, verbose_name="Slug (URL Amigable)")
    description = models.TextField(blank=True, verbose_name="Descripción")
    
    # Soporte para categorías anidadas (e.g., Ropa -> Mujer -> Vestidos)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='children', verbose_name="Categoría Padre")
    
    is_active = models.BooleanField(default=True, verbose_name="Activa")

    class Meta:
        verbose_name = "Categoría"
        verbose_name_plural = "Categorías"

    def __str__(self):
        return self.name