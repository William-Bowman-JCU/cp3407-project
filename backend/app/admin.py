from django.contrib import admin

# Register your models here.

from .models import Address, Cuisine, Restaurant, MenuItem, Order, OrderItem

admin.site.register(Address)
admin.site.register(Restaurant)
admin.site.register(MenuItem)
admin.site.register(Cuisine)
admin.site.register(Order)
admin.site.register(OrderItem)