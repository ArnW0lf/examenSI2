

# backend\apps\categories\views.py
from rest_framework import viewsets
from apps.categories.models import Category
from apps.categories.serializers import CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    """
    CRUD completo para categorías.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
