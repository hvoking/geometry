from django.db import models

class Geometry(models.Model):
	geometryType = models.CharField(max_length=200),
	geometry = models.CharField(max_length=200),
	quantity = models.CharField(max_length=200)
