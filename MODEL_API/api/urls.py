from django.urls import path
from . import views

urlpatterns = [
    path('predict/', views.model_form, name='model_prediction')
]