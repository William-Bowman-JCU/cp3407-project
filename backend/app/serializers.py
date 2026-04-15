from rest_framework import serializers
from .models import Restaurant, MenuItem, Order, OrderItem, Address, Cuisine


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ['id', 'name', 'description', 'price', 'category', 'image_url', 'is_available']


class CuisineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuisine
        fields = ['id', 'name', 'image_url']


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'address', 'rating', 'image_url', 'opening_time', 'closing_time', 'is_active']


class RestaurantDetailSerializer(serializers.ModelSerializer):
    menu_items = MenuItemSerializer(many=True, read_only=True)

    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'cuisine_type', 'address', 'rating', 'image_url', 'opening_time', 'closing_time', 'is_active', 'menu_items']


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'street', 'suburb', 'city', 'postcode', 'is_default']


class OrderItemSerializer(serializers.ModelSerializer):
    menu_item = MenuItemSerializer(read_only=True)
    menu_item_id = serializers.PrimaryKeyRelatedField(
        queryset=MenuItem.objects.all(), source='menu_item', write_only=True
    )
    line_total = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'menu_item', 'menu_item_id', 'quantity', 'unit_price', 'line_total']

    def get_line_total(self, obj):
        return obj.line_total()


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    subtotal = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    delivery_address = AddressSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'restaurant', 'delivery_address', 'status', 'delivery_fee', 'placed_at', 'estimated_delivery', 'items', 'subtotal', 'total']

    def get_subtotal(self, obj):
        return obj.subtotal()

    def get_total(self, obj):
        return obj.total()


class OrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['restaurant', 'delivery_address', 'delivery_fee']

    def create(self, validated_data):
        user = self.context['request'].user
        return Order.objects.create(user=user, **validated_data)
