from django.http import HttpResponseRedirect
from django.urls import reverse
import numpy as np
from rest_framework.response import Response 
from rest_framework.decorators import api_view

from .equations import sphereEquation, sphereTriangulation, meshTriangulation, pointTriangulation, gridEquations

@api_view(['GET'])
def points(request, type, geometry, quantity=30):
	# if 'Referer' in request.headers:
		if geometry == "Sphere":
			points = sphereEquation(5, -2*np.pi, 2*np.pi, 0, np.pi, quantity)
			if type == "mesh" or type == "lines":
				points = sphereTriangulation(points)
		else:
			xx, yy, zz = gridEquations(geometry, -10, 10, -10, 10, quantity)
			if type == "mesh" or type == "lines":
				points = meshTriangulation(xx, yy, zz)
			else:
				points = pointTriangulation(xx, yy, zz)
		return Response({"Positions" : points})
	# else:
	# 	return HttpResponseRedirect(reverse("frontend"))