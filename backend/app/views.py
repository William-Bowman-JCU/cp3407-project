from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Restaurant, MenuItem, Order, Address
from .serializers import (
    RestaurantSerializer,
    RestaurantDetailSerializer,
    MenuItemSerializer,
    OrderSerializer,
    OrderCreateSerializer,
    AddressSerializer,
)


class RestaurantListView(generics.ListAPIView):
    serializer_class = RestaurantSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Restaurant.objects.filter(is_active=True)
        cuisine = self.request.query_params.get('cuisine')
        search = self.request.query_params.get('search')
        if cuisine:
            queryset = queryset.filter(cuisine_type__icontains=cuisine)
        if search:
            queryset = queryset.filter(name__icontains=search)
        return queryset


class RestaurantDetailView(generics.RetrieveAPIView):
    queryset = Restaurant.objects.filter(is_active=True)
    serializer_class = RestaurantDetailSerializer
    permission_classes = [AllowAny]


class MenuItemListView(generics.ListAPIView):
    serializer_class = MenuItemSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return MenuItem.objects.filter(
            restaurant_id=self.kwargs['restaurant_id'],
            is_available=True,
        )


class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-placed_at')


class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderCreateSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request}


class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class AddressListView(generics.ListCreateAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AddressDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)
