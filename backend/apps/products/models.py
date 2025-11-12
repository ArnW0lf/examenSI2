#backend\apps\products\models.py
from django.db import models
from apps.categories.models import Category

class Product(models.Model):
    """
    Modelo principal para un artículo de la boutique (sin especificar talla o color).
    """
    name = models.CharField(max_length=255, verbose_name="Nombre del Producto")
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Slug")
    description = models.TextField(verbose_name="Descripción Completa")
    short_description = models.CharField(max_length=255, blank=True, verbose_name="Descripción Corta")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='products', verbose_name="Categoría")
    
    # Precio base del producto. Las variantes pueden tener un ajuste.
    base_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Precio Base")
    
    is_featured = models.BooleanField(default=False, verbose_name="Destacado")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Creación")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última Modificación")

    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"

    def __str__(self):
        return self.name

class ProductVariant(models.Model):
    """
    Representa una combinación específica de atributos (e.g., Talla L, Color Rojo).
    Esta es la unidad real que se vende y se inventaría.
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants', verbose_name="Producto Base")
    
    # Atributos de la variante
    size = models.CharField(max_length=50, null=True, blank=True, verbose_name="Talla (e.g., S, M, L)")
    color = models.CharField(max_length=50, null=True, blank=True, verbose_name="Color (e.g., Rojo, Negro)")
    
    # El precio final puede ser ajustado por la variante (opcional)
    price_adjustment = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, verbose_name="Ajuste de Precio (+/-)")
    
    sku = models.CharField(max_length=100, unique=True, verbose_name="SKU (Unidad de Mantenimiento de Stock)")
    
    # El campo 'image' podría ir aquí o en un modelo separado para múltiples imágenes por variante.
    image = models.ImageField(upload_to='product_images/', blank=True, null=True, verbose_name="Imagen Principal")

    class Meta:
        verbose_name = "Variante de Producto"
        verbose_name_plural = "Variantes de Producto"
        # Asegura que no haya dos variantes iguales para el mismo producto
        unique_together = ('product', 'size', 'color')

    def __str__(self):
        return f"{self.product.name} ({self.color}, {self.size})"

class ProductImage(models.Model):
    """
    Modelo para almacenar múltiples imágenes por variante o producto.
    """
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, related_name='images', verbose_name="Variante")
    image = models.ImageField(upload_to='product_images/', verbose_name="Archivo de Imagen")
    is_main = models.BooleanField(default=False, verbose_name="Imagen Principal")
    order = models.PositiveSmallIntegerField(default=0, verbose_name="Orden de Visualización")

    class Meta:
        ordering = ['order']
        verbose_name = "Imagen de Producto"
        verbose_name_plural = "Imágenes de Producto"