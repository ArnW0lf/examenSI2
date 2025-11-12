#backend\apps\products\urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.products.views import ProductViewSet, ProductVariantViewSet, ProductImageViewSet
from apps.categories.views import CategoryViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'variants', ProductVariantViewSet, basename='variant')
router.register(r'images', ProductImageViewSet, basename='image')

urlpatterns = [
    path('', include(router.urls)),
]
