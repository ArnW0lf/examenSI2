import os
import django
import pandas as pd
from django.utils.text import slugify

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "smart_boutique.settings")
django.setup()

from apps.categories.models import Category
from apps.products.models import Product, ProductVariant

# Cargar los datos desde los archivos CSV
categories_df = pd.read_csv("datasets/categories.csv")
products_df = pd.read_csv("datasets/products.csv")
variants_df = pd.read_csv("datasets/product_variants.csv")

#Cargar categorías
for _, row in categories_df.iterrows():
    Category.objects.get_or_create(
        name=row["name"],
        slug=row["slug"],
        defaults={
            "description": row.get("description", ""),
            "is_active": True
        }
    )

print("Categorías cargadas correctamente.")

#  Cargar productos
for _, row in products_df.iterrows():
    try:
        category = Category.objects.get(id=row["category_id"])
    except Category.DoesNotExist:
        print(f"⚠️ Categoría con ID {row['category_id']} no encontrada, se omite el producto {row['name']}")
        continue

    # Asegurarnos de que el slug sea único
    slug = slugify(row["slug"])
    original_slug = slug
    counter = 1
    while Product.objects.filter(slug=slug).exists():
        slug = f"{original_slug}-{counter}"
        counter += 1

    Product.objects.create(
        name=row["name"],
        slug=slug,
        description=row["description"],
        short_description=row.get("short_description", ""),
        category=category,
        base_price=row["base_price"],
        is_featured=row["is_featured"]
    )

print("Productos cargados correctamente.")


# Cargar variantes
for _, row in variants_df.iterrows():
    product = Product.objects.filter(id=row["product_id"]).first()
    if not product:
        print(f"⚠️ Producto con ID {row['product_id']} no encontrado, se omite la variante {row.get('sku', 'sin SKU')}")
        continue

    ProductVariant.objects.get_or_create(
        sku=row["sku"],  # Para evitar duplicados
        defaults={
            "product": product,
            "size": row.get("size", ""),
            "color": row.get("color", ""),
            "price_adjustment": row.get("price_adjustment", 0.0),
            "image": row.get("image", "product_images/placeholder.jpg")
        }
    )

print(" Datos cargados correctamente en la base de datos.")