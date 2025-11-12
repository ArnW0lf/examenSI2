"""
URL configuration for smart_boutique project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
#backend\smart_boutique\urls.py
from django.contrib import admin
# Importar funciones necesarias para definir rutas
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    # Endpoints de la app users
    path("api/users/", include("apps.users.urls")),
    path("api/products/", include("apps.products.urls")),
    path("api/categories/", include("apps.categories.urls")),
    path("api/orders/", include("apps.orders.urls")),
    path("api/customers/", include("apps.customers.urls")),
    path("api/inventory/", include("apps.inventory.urls")),
    path("api/promotions/", include("apps.promotions.urls")),
    path("api/recommender_ai/", include("apps.recommender_ai.urls")),
    path("api/reviews/", include("apps.reviews.urls")),
    path("api/notifications/", include("apps.notifications.urls")),
    path("api/payments/", include("apps.payments.urls")),


    # En el futuro, podrías incluir otras apps así:
    # path("api/products/", include("apps.products.urls")),
    # path("api/orders/", include("apps.orders.urls")),
]
