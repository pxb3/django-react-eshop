from django.db import models


class Item(models.Model):

    image = models.CharField(max_length=256)
    description = models.CharField(max_length=256)
    brand = models.CharField(max_length=32, default='whatever')
    price = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.image} {self.description}"
