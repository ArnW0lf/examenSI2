
# backend/apps/categories/urls.py
from rest_framework import routers
from django.urls import path, include
from apps.categories.views import CategoryViewSet

router = routers.DefaultRouter()
router.register(r'', CategoryViewSet, basename='category')  # <- vacío

urlpatterns = [
    path('', include(router.urls)),
]
