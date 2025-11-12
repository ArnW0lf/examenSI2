#backend\apps\users\urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from .views import UserViewSet, RegisterView, MyTokenObtainPairView


# Router para UserViewSet (list, retrieve, update, delete)
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    # Endpoints del router
    path('', include(router.urls)),
    # Registro de usuarios
    path('register/', RegisterView.as_view(), name='register'),
    # Login JWT
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
    