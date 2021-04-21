from django.urls import path
from . import views

app_name="points"
urlpatterns = [
	path('index/', views.index, name="index"),
	path('quotes/', views.quotes, name="quotes"),
	path('quotes/<str:node>', views.quotes, name="quotes"),
	path('<str:geometry>/<str:name>/<int:quantity>', views.points, name="points"),
]