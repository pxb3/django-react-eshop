from django.db import models
from accounts.models import User


class Item(models.Model):

    image = models.CharField(max_length=256)
    description = models.CharField(max_length=256)
    brand = models.CharField(max_length=32, default='whatever')
    price = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.image} {self.description}"


class Order(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user} {self.date_created}"


class Cart(models.Model):

    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    item = models.ManyToManyField(Item)

    def __str__(self):
        return f"{self}"


class Comment(models.Model):

    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    text = models.CharField(max_length=256)
    user = models.ForeignKey(User, on_delete=models.CASCADE, to_field='username')
    date_created = models.DateField(auto_now=True)

    def __str__(self):
        return f"{self}"