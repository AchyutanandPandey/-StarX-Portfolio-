from django.urls import path
from .views import contact_api, health_api

urlpatterns = [
    path("contact/", contact_api, name="contact"),
    path("health/", health_api, name="health"),
]
