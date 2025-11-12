#backend\apps\categories\serializers.py

# backend/apps/categories/serializers.py
from rest_framework import serializers
from apps.categories.models import Category

class CategorySerializer(serializers.ModelSerializer):
    parent_id = serializers.PrimaryKeyRelatedField(
        source='parent', queryset=Category.objects.all(), write_only=True, required=False, allow_null=True
    )
    parent = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'parent', 'parent_id', 'is_active']
