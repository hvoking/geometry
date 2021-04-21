from django.shortcuts import render
from django.http import JsonResponse, HttpResponseRedirect
from django.urls import reverse
import numpy as np

def index(request):
	return render(request, "points/index.html")

def quotes(request, node=1):
	q = request
	if q:
		nodes = ["Points", "Curves", "Mesh", "Sphere", "Cube"]
	else:
		nodes = []
	return JsonResponse({"nodes": nodes})

def points(request, geometry, name, quantity=30):
	if 'Referer' in request.headers:
		if name == "Sphere":
			points = sphereEquation(5, -2*np.pi, 2*np.pi, 0, np.pi, quantity)
			if geometry == "mesh" or geometry == "lines":
				points = sphereTriangulation(points)
		else:
			xx, yy, zz = gridEquations(name, -10, 10, -10, 10, quantity)
			if geometry == "mesh" or geometry == "lines":
				points = meshTriangulation(xx, yy, zz)
			else:
				points = pointTriangulation(xx, yy, zz)
		return JsonResponse({"Positions" : points})
	else:
		return HttpResponseRedirect(reverse("points:index"))

# Polar coordinates
def sphereEquation(r, tstart, tend, vstart, vend, quantity):
	points = []
	t = np.linspace(tstart, tend, quantity)
	v = np.linspace(vstart, vend, quantity)
	for i in t:
		point = []
		for j in v:
			x = r*np.sin(i)*np.cos(j)
			y = r*np.sin(i)*np.sin(j)
			z = r*np.cos(i)
			point.append((x, y, z))
		points.append(point)
	return points

def sphereTriangulation(points):
	positions = []
	q = len(points)
	for i in range(q-1):
		point = []
		for j in range(q-1):
			point.append(points[i][j])
			point.append(points[i+1][j])
			point.append(points[i][j+1])
			point.append(points[i + 1][j + 1])
			point.append(points[i+1][j])
			point.append(points[i][j+1])
		positions.append(point)
	return positions

# Cartesian coordinates
def gridEquations(name, xmin, xmax, ymin, ymax, quantity):
	x = np.linspace(xmin, xmax, quantity)
	y = np.linspace(ymin, ymax, quantity)
	xx, yy = np.meshgrid(x, y)
	if name == "Cube":
		zz = np.sin(np.sqrt(xx**2 + yy**2))
	if name == "Cylinder":
		zz = np.sin(np.sqrt(np.abs(xx**2 - yy**2)))
	if name == "Equation1":
		zz = np.cos(np.sqrt(xx**2 + yy**2))
	return (xx, yy, zz)

def pointTriangulation(xx, yy, zz):
	points = []
	for i in range(len(xx)):
		point = []
		for j in range(len(yy)):
			point.append((xx[i, j], yy[i, j], zz[i, j]))
		points.append(point)
	return points

def meshTriangulation(xx, yy, zz):
	points = []
	for i in range(len(xx)-1):
		point = []
		for j in range(len(yy)-1):
			point.append((xx[i, j], yy[i, j], zz[i, j]))
			point.append((xx[i+1, j], yy[i+1, j], zz[i+1, j]))
			point.append((xx[i, j+1], yy[i, j+1], zz[i, j+1]))
			point.append((xx[i+1, j+1], yy[i+1, j+1], zz[i+1, j+1]))
			point.append((xx[i+1, j], yy[i+1, j], zz[i+1, j]))
			point.append((xx[i, j+1], yy[i, j+1], zz[i, j+1]))
		points.append(point)
	return points
