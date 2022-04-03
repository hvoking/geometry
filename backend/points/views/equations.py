import numpy as np

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

