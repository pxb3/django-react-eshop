from django.contrib import admin
from .models import Item


# Register your models here.
class ItemAdmin(admin.ModelAdmin):
    list = ('image', 'description', 'brand', 'price')


admin.site.register(Item, ItemAdmin)
