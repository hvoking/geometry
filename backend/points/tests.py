import os
import pathlib
import unittest
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from django.test import Client, TestCase
from .views import *
import numpy as np

def file_uri(filename):
	return pathlib.Path(os.path.abspath(filename)).as_uri()

driver = webdriver.Chrome(ChromeDriverManager().install())

r = 5
tstart = 0
tend = 2*np.pi 
vstart = 0
vend = np.pi
quantity = 30
spherePoints = sphereEquation(r, tstart, tend, vstart, vend, quantity)

name = "Cube"
xmin = -10
xmax = 10
ymin = -10
ymax = 10
xx, yy, zz = gridEquations(name, xmin, xmax, ymin, ymax, quantity)

class GeometryTest(TestCase):
	def setUp(self):
		pass
	def test_is_sphere(self):
		self.assertEqual(len(spherePoints), quantity)

	def test_valid_index(self):
		c = Client()
		response = c.get("/index/")
		self.assertEqual(response.status_code, 200)

	def test_valid_urls(self):
		c = Client()
		response = c.get("/mesh/Sphere/50")
		self.assertEqual(response.status_code, 302)

	def test_invalid_urls(self):
		c = Client()
		response = c.get("/lines/Sphere/-30")
		self.assertEqual(response.status_code, 404)


# Check the url points/Sphere, points/Cylinder when reload because it wants lo get a JsonResponse
