from django.urls import path
from .views import quotes, points

app_name="points"
urlpatterns = [
	path('quotes/', quotes, name="quotes"),
	path('quotes/<str:node>', quotes, name="quotes"),
	path('<str:type>/<str:geometry>/<int:quantity>/', points, name="points"),
]