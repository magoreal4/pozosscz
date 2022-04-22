from django.urls import path
from fcontact import views

app_name = "fcontact_app"

urlpatterns = [
    path('', views.contact_form, name='ContactForm'),
]
