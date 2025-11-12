#backend\apps\users\views.py

from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model

from .serializers import UserSerializer, RegisterSerializer
from .serializers import MyTokenObtainPairSerializer
from apps.users.serializers import UserSerializerCRUD

User = get_user_model()
# Vista personalizada para el login con JWT usando email
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
"""
# Endpoint para listar y gestionar usuarios
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]  # Solo usuarios autenticados

    # Endpoint adicional: obtener perfil propio
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
"""
# --- REGISTRO ---
# Endpoint para registrar nuevos usuarios
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]  # Permitir registro sin login



# --- CRUD (solo para administradores) ---
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializerCRUD
    permission_classes = [permissions.AllowAny]

#IsAuthenticated