from rest_framework.response import Response 
from rest_framework.decorators import api_view

@api_view(['GET'])
def quotes(request):
	q = request
	if q:
		nodes = ["Points", "Curves", "Mesh", "Sphere", "Cube"]
	else:
		nodes = []
	return Response({"nodes": nodes})