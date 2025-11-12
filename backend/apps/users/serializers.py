from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate

User = get_user_model()
# --- AUTENTICACIÓN ---
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'  # Aquí indicamos que se use email en lugar de username

    def validate(self, attrs):
        data = super().validate(attrs)
        # Agregar info adicional al payload
        data['role'] = self.user.role
        data['email'] = self.user.email
        return data

# --- PERFIL DE USUARIO (solo lectura general) ---   
# convierte el modelo de usuario en un formato JSON 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'phone', 'address', 'city', 'country', 'birth_date',
            'role', 'profile_image', 'date_joined', 'last_login'
        ]
        read_only_fields = ['id', 'date_joined', 'last_login']#campos de solo lectura


# --- REGISTRO DE NUEVOS USUARIOS ---
#  serializador para registrar nuevos usuarios
# Serializador para registrar nuevos usuarios
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'first_name', 'last_name']

    # Validar que el email sea único
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este email ya está registrado")
        return value

    # Crear usuario con email como login
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data.get('username', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

# --- CRUD ADMINISTRATIVO (para admin dashboard) ---
class UserSerializerCRUD(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'phone', 'address', 'city', 'country', 'birth_date',
            'role', 'profile_image', 'password', 'date_joined', 'last_login'
        ]
        read_only_fields = ['id', 'date_joined', 'last_login']

    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance