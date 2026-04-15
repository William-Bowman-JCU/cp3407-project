from django.contrib import admin

# Register your models here.

from .models import Address, Restaurant, MenuItem, Order, OrderItem

admin.site.register(Address)
admin.site.register(Restaurant)
admin.site.register(MenuItem)