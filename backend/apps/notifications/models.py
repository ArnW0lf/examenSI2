#backend\apps\notifications\models.py


from django.db import models
#from apps.users.models import User  # Importa tu modelo User personalizado
from django.conf import settings

class Notification(models.Model):
    """
    Registro de notificaciones o mensajes a enviar a los usuarios.
    """
    TYPE_CHOICES = [
        ('EMAIL', 'Correo Electrónico'),
        ('PUSH', 'Notificación Push'),
        ('SMS', 'Mensaje de Texto'),
        ('IN_APP', 'Notificación en la Aplicación'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notifications',
        verbose_name="Usuario Destino"
    )
    
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, verbose_name="Tipo de Notificación")
    title = models.CharField(max_length=255, verbose_name="Título")
    message = models.TextField(verbose_name="Mensaje")
    
    is_read = models.BooleanField(default=False, verbose_name="Leída")
    sent_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Envío")
    
    # Campo opcional para enlaces a donde lleva la notificación
    target_url = models.URLField(max_length=255, blank=True, null=True, verbose_name="URL Destino")

    class Meta:
        ordering = ['-sent_at']
        verbose_name = "Notificación"
        verbose_name_plural = "Notificaciones"

    def __str__(self):
        return f"{self.user.username} - {self.title}"
