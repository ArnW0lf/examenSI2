#backend\apps\products\views.py
from rest_framework import viewsets, filters

from apps.products.models import Product, ProductVariant, ProductImage
from apps.categories.models import Category
from apps.products.serializers import (
    ProductSerializer, ProductVariantSerializer, ProductImageSerializer,CategorySerializer
)

from rest_framework.pagination import PageNumberPagination

class ProductPagination(PageNumberPagination):
    page_size = 20  # 🔹 controla cuántos productos verás por página
    page_size_query_param = 'page_size'
    max_page_size = 100




class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related('category').prefetch_related('variants')
    serializer_class = ProductSerializer
    pagination_class = ProductPagination

    # Permite filtrar y buscar desde el frontend (por nombre, categoría, etc.)
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'category__name']
    ordering_fields = ['base_price', 'created_at', 'name']
    ordering = ['name']

    def get_queryset(self):
        queryset = super().get_queryset()

        # 🔹 Permite filtrar por categoría desde el frontend (por ejemplo: ?category_id=3)
        category_id = self.request.query_params.get('category_id')
        if category_id:
            queryset = queryset.filter(category_id=category_id)

        return queryset


class ProductVariantViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.select_related('product')
    serializer_class = ProductVariantSerializer


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.select_related('variant')
    serializer_class = ProductImageSerializer
