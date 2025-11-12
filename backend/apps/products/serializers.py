#backend\apps\products\serializers.py

from rest_framework import serializers
from apps.products.models import Product, ProductVariant, ProductImage
from apps.categories.models import Category




class CategorySerializer(serializers.ModelSerializer):
    parent_id = serializers.PrimaryKeyRelatedField(
        source='parent', queryset=Category.objects.all(), write_only=True, required=False, allow_null=True
    )
    parent = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'parent', 'parent_id', 'is_active']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'is_main', 'order']


class ProductVariantSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = ProductVariant
        fields = [
            'id', 'size', 'color', 'price_adjustment',
            'sku', 'image', 'images'
        ]


# backend/apps/products/serializers.py
class ProductSerializer(serializers.ModelSerializer):
    category_id = serializers.PrimaryKeyRelatedField(
        source='category', queryset=Category.objects.all(), write_only=True
    )
    category = CategorySerializer(read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'short_description',
            'category', 'category_id', 'base_price', 'is_featured',
            'created_at', 'updated_at', 'variants'
        ]
