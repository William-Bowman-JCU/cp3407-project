from decimal import Decimal
from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.urls import reverse
from django.utils import timezone
from rest_framework.test import APIClient
from rest_framework import status as http_status

from .models import Address, Restaurant, MenuItem, Order, OrderItem


def make_user(username='testuser', password='SecurePass123!'):
    return User.objects.create_user(
        username=username,
        email=f'{username}@feedme.com',
        password=password,
        first_name='Test',
        last_name='User',
    )


def make_restaurant(name='Burger Palace', cuisine='Fast Food'):
    return Restaurant.objects.create(
        name=name,
        cuisine_type=cuisine,
        address='123 Test St, Townsville',
        rating=4.2,
        opening_time='09:00',
        closing_time='22:00',
        is_active=True,
    )


def make_menu_item(restaurant, name='Cheeseburger', price='12.50', category='Mains'):
    return MenuItem.objects.create(
        restaurant=restaurant,
        name=name,
        description='A classic cheeseburger.',
        price=Decimal(price),
        category=category,
        is_available=True,
    )


def make_address(user, street='10 Main Rd', suburb='Townsville', postcode='4810', is_default=True):
    return Address.objects.create(
        user=user,
        street=street,
        suburb=suburb,
        city='Townsville',
        postcode=postcode,
        is_default=is_default,
    )


class UserAuthenticationTest(TestCase):

    def test_create_user_stores_hashed_password(self):
        user = make_user()
        self.assertNotEqual(user.password, 'SecurePass123!')
        self.assertTrue(user.check_password('SecurePass123!'))

    def test_create_user_email_stored(self):
        user = make_user(username='leonard')
        self.assertEqual(user.email, 'leonard@feedme.com')

    def test_correct_credentials_authenticate(self):
        make_user(username='buyer', password='Pass1234!')
        client = Client()
        logged_in = client.login(username='buyer', password='Pass1234!')
        self.assertTrue(logged_in)

    def test_wrong_password_rejected(self):
        make_user(username='buyer2', password='RealPass1!')
        client = Client()
        logged_in = client.login(username='buyer2', password='WrongPass!')
        self.assertFalse(logged_in)

    def test_unknown_username_rejected(self):
        client = Client()
        logged_in = client.login(username='nobody', password='anything')
        self.assertFalse(logged_in)

    def test_duplicate_username_raises_error(self):
        make_user(username='duplicated')
        with self.assertRaises(Exception):
            User.objects.create_user(username='duplicated', password='Another1!')


class AddressModelTest(TestCase):

    def setUp(self):
        self.user = make_user()

    def test_create_address(self):
        addr = make_address(self.user)
        self.assertEqual(addr.street, '10 Main Rd')
        self.assertEqual(addr.postcode, '4810')
        self.assertTrue(addr.is_default)

    def test_str_representation(self):
        addr = make_address(self.user)
        self.assertIn('10 Main Rd', str(addr))
        self.assertIn('4810', str(addr))

    def test_setting_new_default_clears_old_default(self):
        first = make_address(self.user, street='1 Alpha St', is_default=True)
        second = make_address(self.user, street='2 Beta St', is_default=True)
        first.refresh_from_db()
        self.assertFalse(first.is_default)
        self.assertTrue(second.is_default)

    def test_user_can_have_multiple_addresses(self):
        make_address(self.user, street='1 First Ave', is_default=True)
        make_address(self.user, street='2 Second Ave', is_default=False)
        self.assertEqual(self.user.addresses.count(), 2)

    def test_address_deleted_with_user(self):
        make_address(self.user)
        self.user.delete()
        self.assertEqual(Address.objects.count(), 0)


class RestaurantModelTest(TestCase):

    def test_create_restaurant(self):
        r = make_restaurant()
        self.assertEqual(r.name, 'Burger Palace')
        self.assertTrue(r.is_active)

    def test_str_representation(self):
        r = make_restaurant(name='Sushi World')
        self.assertEqual(str(r), 'Sushi World')

    def test_rating_within_valid_range(self):
        r = make_restaurant()
        r.rating = 4.9
        r.full_clean()

    def test_rating_above_five_fails_validation(self):
        r = make_restaurant()
        r.rating = 5.1
        with self.assertRaises(ValidationError):
            r.full_clean()

    def test_rating_below_zero_fails_validation(self):
        r = make_restaurant()
        r.rating = -0.1
        with self.assertRaises(ValidationError):
            r.full_clean()

    def test_inactive_restaurant_flag(self):
        r = make_restaurant()
        r.is_active = False
        r.save()
        self.assertFalse(Restaurant.objects.get(pk=r.pk).is_active)


class MenuItemModelTest(TestCase):

    def setUp(self):
        self.restaurant = make_restaurant()

    def test_create_menu_item(self):
        item = make_menu_item(self.restaurant)
        self.assertEqual(item.name, 'Cheeseburger')
        self.assertEqual(item.price, Decimal('12.50'))
        self.assertTrue(item.is_available)

    def test_str_representation(self):
        item = make_menu_item(self.restaurant, name='Veggie Wrap', price='9.50')
        self.assertIn('Veggie Wrap', str(item))
        self.assertIn('9.50', str(item))

    def test_negative_price_fails_validation(self):
        item = MenuItem(
            restaurant=self.restaurant,
            name='Bad Item',
            price=Decimal('-1.00'),
            category='Mains',
        )
        with self.assertRaises(ValidationError):
            item.full_clean()

    def test_multiple_items_per_restaurant(self):
        make_menu_item(self.restaurant, name='Burger')
        make_menu_item(self.restaurant, name='Fries', price='4.50', category='Sides')
        make_menu_item(self.restaurant, name='Cola', price='3.00', category='Drinks')
        self.assertEqual(self.restaurant.menu_items.count(), 3)

    def test_unavailable_item_flag(self):
        item = make_menu_item(self.restaurant)
        item.is_available = False
        item.save()
        self.assertFalse(MenuItem.objects.get(pk=item.pk).is_available)

    def test_items_deleted_with_restaurant(self):
        make_menu_item(self.restaurant)
        make_menu_item(self.restaurant, name='Fries', price='4.00')
        self.restaurant.delete()
        self.assertEqual(MenuItem.objects.count(), 0)


class OrderModelTest(TestCase):

    def setUp(self):
        self.user = make_user()
        self.restaurant = make_restaurant()
        self.address = make_address(self.user)
        self.item_a = make_menu_item(self.restaurant, name='Burger', price='12.50')
        self.item_b = make_menu_item(self.restaurant, name='Fries', price='4.50', category='Sides')

    def _make_order(self):
        return Order.objects.create(
            user=self.user,
            restaurant=self.restaurant,
            delivery_address=self.address,
            delivery_fee=Decimal('3.99'),
        )

    def test_order_default_status_is_pending(self):
        order = self._make_order()
        self.assertEqual(order.status, 'pending')

    def test_order_str_includes_user(self):
        order = self._make_order()
        self.assertIn('testuser', str(order))

    def test_order_subtotal_with_single_item(self):
        order = self._make_order()
        OrderItem.objects.create(order=order, menu_item=self.item_a, quantity=1, unit_price=self.item_a.price)
        self.assertEqual(order.subtotal(), Decimal('12.50'))

    def test_order_subtotal_with_multiple_items(self):
        order = self._make_order()
        OrderItem.objects.create(order=order, menu_item=self.item_a, quantity=2, unit_price=self.item_a.price)
        OrderItem.objects.create(order=order, menu_item=self.item_b, quantity=1, unit_price=self.item_b.price)
        self.assertEqual(order.subtotal(), Decimal('29.50'))

    def test_order_total_includes_delivery_fee(self):
        order = self._make_order()
        OrderItem.objects.create(order=order, menu_item=self.item_a, quantity=1, unit_price=self.item_a.price)
        self.assertEqual(order.total(), Decimal('16.49'))

    def test_order_total_with_zero_items_equals_delivery_fee(self):
        order = self._make_order()
        self.assertEqual(order.total(), Decimal('3.99'))

    def test_order_status_transitions(self):
        order = self._make_order()
        for status, _ in Order.STATUS_CHOICES:
            order.status = status
            order.save()
            self.assertEqual(Order.objects.get(pk=order.pk).status, status)

    def test_unit_price_fixed_at_order_time(self):
        order = self._make_order()
        OrderItem.objects.create(order=order, menu_item=self.item_a, quantity=1, unit_price=self.item_a.price)
        self.item_a.price = Decimal('99.99')
        self.item_a.save()
        order_item = order.items.get(menu_item=self.item_a)
        self.assertEqual(order_item.unit_price, Decimal('12.50'))

    def test_placed_at_set_automatically(self):
        order = self._make_order()
        self.assertIsNotNone(order.placed_at)
        self.assertLessEqual(order.placed_at, timezone.now())

    def test_user_can_have_multiple_orders(self):
        self._make_order()
        self._make_order()
        self.assertEqual(self.user.orders.count(), 2)


class OrderItemModelTest(TestCase):

    def setUp(self):
        self.user = make_user()
        self.restaurant = make_restaurant()
        self.address = make_address(self.user)
        self.order = Order.objects.create(
            user=self.user,
            restaurant=self.restaurant,
            delivery_address=self.address,
        )

    def test_line_total_single_quantity(self):
        item = make_menu_item(self.restaurant, price='15.00')
        oi = OrderItem.objects.create(order=self.order, menu_item=item, quantity=1, unit_price=Decimal('15.00'))
        self.assertEqual(oi.line_total(), Decimal('15.00'))

    def test_line_total_multiple_quantity(self):
        item = make_menu_item(self.restaurant, price='8.00')
        oi = OrderItem.objects.create(order=self.order, menu_item=item, quantity=3, unit_price=Decimal('8.00'))
        self.assertEqual(oi.line_total(), Decimal('24.00'))

    def test_str_includes_item_name(self):
        item = make_menu_item(self.restaurant, name='Pasta')
        oi = OrderItem.objects.create(order=self.order, menu_item=item, quantity=2, unit_price=item.price)
        self.assertIn('Pasta', str(oi))
        self.assertIn('2', str(oi))

    def test_order_items_deleted_with_order(self):
        item = make_menu_item(self.restaurant)
        OrderItem.objects.create(order=self.order, menu_item=item, quantity=1, unit_price=item.price)
        self.order.delete()
        self.assertEqual(OrderItem.objects.count(), 0)


class AcceptanceTest(TestCase):

    def test_us01_user_can_register_account(self):
        user = User.objects.create_user(
            username='newuser@feedme.com',
            email='newuser@feedme.com',
            password='StrongPass1!',
            first_name='Jane',
            last_name='Doe',
        )
        self.assertIsNotNone(user.pk)
        self.assertTrue(user.check_password('StrongPass1!'))
        self.assertFalse(user.is_staff)

    def test_us02_registered_user_can_login(self):
        User.objects.create_user(username='logintest', password='Pass1234!')
        client = Client()
        result = client.login(username='logintest', password='Pass1234!')
        self.assertTrue(result)

    def test_us02_wrong_credentials_cannot_login(self):
        User.objects.create_user(username='secure', password='RightPass1!')
        client = Client()
        result = client.login(username='secure', password='WrongPass!')
        self.assertFalse(result)

    def test_us05_cart_total_calculated_correctly(self):
        user = make_user()
        restaurant = make_restaurant()
        address = make_address(user)
        pizza = make_menu_item(restaurant, name='Margherita Pizza', price='18.00')
        drink = make_menu_item(restaurant, name='Lemonade', price='4.50', category='Drinks')

        order = Order.objects.create(
            user=user,
            restaurant=restaurant,
            delivery_address=address,
            delivery_fee=Decimal('3.99'),
        )
        OrderItem.objects.create(order=order, menu_item=pizza, quantity=2, unit_price=pizza.price)
        OrderItem.objects.create(order=order, menu_item=drink, quantity=1, unit_price=drink.price)

        self.assertEqual(order.subtotal(), Decimal('40.50'))
        self.assertEqual(order.total(), Decimal('44.49'))

    def test_us06_checkout_creates_confirmed_order(self):
        user = make_user()
        restaurant = make_restaurant()
        address = make_address(user)
        order = Order.objects.create(
            user=user,
            restaurant=restaurant,
            delivery_address=address,
            status='confirmed',
        )
        self.assertEqual(order.status, 'confirmed')
        self.assertIsNotNone(order.pk)
        self.assertEqual(order.delivery_address, address)

    def test_us07_order_status_progresses_to_delivered(self):
        user = make_user()
        restaurant = make_restaurant()
        address = make_address(user)
        order = Order.objects.create(
            user=user,
            restaurant=restaurant,
            delivery_address=address,
            status='pending',
        )
        for status in ['confirmed', 'preparing', 'on_the_way', 'delivered']:
            order.status = status
            order.save()
        order.refresh_from_db()
        self.assertEqual(order.status, 'delivered')

    def test_us08_user_can_add_multiple_addresses(self):
        user = make_user()
        make_address(user, street='1 Home St', is_default=True)
        make_address(user, street='2 Work Ave', is_default=False)
        self.assertEqual(user.addresses.count(), 2)
        self.assertEqual(user.addresses.filter(is_default=True).count(), 1)

    def test_us09_default_address_updated_when_new_default_set(self):
        user = make_user()
        old = make_address(user, street='Old St', is_default=True)
        new = make_address(user, street='New St', is_default=True)
        old.refresh_from_db()
        self.assertFalse(old.is_default)
        self.assertTrue(new.is_default)

    def test_us12_order_history_returns_all_user_orders(self):
        user = make_user()
        restaurant = make_restaurant()
        address = make_address(user)
        for _ in range(3):
            Order.objects.create(user=user, restaurant=restaurant, delivery_address=address)
        self.assertEqual(user.orders.count(), 3)

    def test_price_snapshot_preserved_after_menu_change(self):
        user = make_user()
        restaurant = make_restaurant()
        address = make_address(user)
        item = make_menu_item(restaurant, name='Steak', price='28.00')

        order = Order.objects.create(user=user, restaurant=restaurant, delivery_address=address)
        OrderItem.objects.create(order=order, menu_item=item, quantity=1, unit_price=item.price)

        item.price = Decimal('35.00')
        item.save()

        order_item = order.items.first()
        self.assertEqual(order_item.unit_price, Decimal('28.00'))
        self.assertEqual(order_item.line_total(), Decimal('28.00'))

    def test_inactive_restaurant_can_still_be_queried(self):
        r = make_restaurant(name='Closed Place')
        r.is_active = False
        r.save()
        fetched = Restaurant.objects.get(name='Closed Place')
        self.assertFalse(fetched.is_active)


class RestaurantAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.r1 = make_restaurant(name='Burger Palace', cuisine='Fast Food')
        self.r2 = make_restaurant(name='Sushi World', cuisine='Japanese')
        self.inactive = Restaurant.objects.create(
            name='Closed Diner', cuisine_type='American',
            address='1 Old St', rating=3.0,
            opening_time='09:00', closing_time='22:00', is_active=False,
        )

    def test_list_returns_only_active_restaurants(self):
        response = self.client.get('/api/restaurants/')
        self.assertEqual(response.status_code, http_status.HTTP_200_OK)
        names = [r['name'] for r in response.data]
        self.assertIn('Burger Palace', names)
        self.assertIn('Sushi World', names)
        self.assertNotIn('Closed Diner', names)

    def test_list_returns_correct_fields(self):
        response = self.client.get('/api/restaurants/')
        first = response.data[0]
        for field in ['id', 'name', 'cuisine_type', 'rating', 'is_active']:
            self.assertIn(field, first)

    def test_filter_by_cuisine(self):
        response = self.client.get('/api/restaurants/?cuisine=japanese')
        self.assertEqual(response.status_code, http_status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Sushi World')

    def test_search_by_name(self):
        response = self.client.get('/api/restaurants/?search=burger')
        self.assertEqual(response.status_code, http_status.HTTP_200_OK)
        self.assertEqual(response.data[0]['name'], 'Burger Palace')

    def test_search_no_match_returns_empty(self):
        response = self.client.get('/api/restaurants/?search=zzznomatch')
        self.assertEqual(response.status_code, http_status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_detail_includes_menu_items(self):
        item = make_menu_item(self.r1, name='Cheeseburger', price='12.50')
        response = self.client.get(f'/api/restaurants/{self.r1.pk}/')
        self.assertEqual(response.status_code, http_status.HTTP_200_OK)
        self.assertIn('menu_items', response.data)
        self.assertEqual(response.data['menu_items'][0]['name'], 'Cheeseburger')

    def test_detail_inactive_restaurant_returns_404(self):
        response = self.client.get(f'/api/restaurants/{self.inactive.pk}/')
        self.assertEqual(response.status_code, http_status.HTTP_404_NOT_FOUND)


class MenuItemAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.restaurant = make_restaurant()
        make_menu_item(self.restaurant, name='Burger', price='12.50', category='Mains')
        make_menu_item(self.restaurant, name='Fries', price='4.50', category='Sides')
        unavailable = make_menu_item(self.restaurant, name='Sold Out Item', price='9.00')
        unavailable.is_available = False
        unavailable.save()

    def test_menu_lists_available_items_only(self):
        response = self.client.get(f'/api/restaurants/{self.restaurant.pk}/menu/')
        self.assertEqual(response.status_code, http_status.HTTP_200_OK)
        names = [i['name'] for i in response.data]
        self.assertIn('Burger', names)
        self.assertIn('Fries', names)
        self.assertNotIn('Sold Out Item', names)

    def test_menu_item_has_required_fields(self):
        response = self.client.get(f'/api/restaurants/{self.restaurant.pk}/menu/')
        item = response.data[0]
        for field in ['id', 'name', 'price', 'category', 'is_available']:
            self.assertIn(field, item)

    def test_menu_for_unknown_restaurant_returns_empty(self):
        response = self.client.get('/api/restaurants/99999/menu/')
        self.assertEqual(response.status_code, http_status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)


class OrderAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = make_user()
        self.restaurant = make_restaurant()
        self.address = make_address(self.user)

    def test_order_list_requires_authentication(self):
        response = self.client.get('/api/orders/')
        self.assertEqual(response.status_code, http_status.HTTP_403_FORBIDDEN)

    def test_authenticated_user_can_list_own_orders(self):
        Order.objects.create(user=self.user, restaurant=self.restaurant, delivery_address=self.address)
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/orders/')
        self.assertEqual(response.status_code, http_status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_user_cannot_see_other_users_orders(self):
        other_user = make_user(username='otheruser')
        Order.objects.create(user=other_user, restaurant=self.restaurant, delivery_address=make_address(other_user))
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/orders/')
        self.assertEqual(response.status_code, http_status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_authenticated_user_can_create_order(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/api/orders/create/', {
            'restaurant': self.restaurant.pk,
            'delivery_address': self.address.pk,
            'delivery_fee': '3.99',
        })
        self.assertEqual(response.status_code, http_status.HTTP_201_CREATED)
        self.assertEqual(Order.objects.filter(user=self.user).count(), 1)

    def test_order_create_requires_authentication(self):
        response = self.client.post('/api/orders/create/', {
            'restaurant': self.restaurant.pk,
            'delivery_address': self.address.pk,
        })
        self.assertEqual(response.status_code, http_status.HTTP_403_FORBIDDEN)

    def test_order_detail_includes_subtotal_and_total(self):
        order = Order.objects.create(
            user=self.user, restaurant=self.restaurant,
            delivery_address=self.address, delivery_fee=Decimal('3.99'),
        )
        item = make_menu_item(self.restaurant, price='15.00')
        from .models import OrderItem
        OrderItem.objects.create(order=order, menu_item=item, quantity=2, unit_price=item.price)
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'/api/orders/{order.pk}/')
        self.assertEqual(response.status_code, http_status.HTTP_200_OK)
        self.assertEqual(Decimal(str(response.data['subtotal'])), Decimal('30.00'))
        self.assertEqual(Decimal(str(response.data['total'])), Decimal('33.99'))


class AddressAPITest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = make_user()

    def test_address_list_requires_authentication(self):
        response = self.client.get('/api/addresses/')
        self.assertEqual(response.status_code, http_status.HTTP_403_FORBIDDEN)

    def test_authenticated_user_can_list_addresses(self):
        make_address(self.user, street='1 Home St')
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/addresses/')
        self.assertEqual(response.status_code, http_status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_authenticated_user_can_create_address(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/api/addresses/', {
            'street': '42 New Rd',
            'suburb': 'Townsville',
            'city': 'Townsville',
            'postcode': '4810',
            'is_default': True,
        })
        self.assertEqual(response.status_code, http_status.HTTP_201_CREATED)
        self.assertEqual(Address.objects.filter(user=self.user).count(), 1)

    def test_user_cannot_see_other_users_addresses(self):
        other_user = make_user(username='otheruser2')
        make_address(other_user, street='Secret St')
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/addresses/')
        self.assertEqual(response.status_code, http_status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_authenticated_user_can_delete_own_address(self):
        addr = make_address(self.user)
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(f'/api/addresses/{addr.pk}/')
        self.assertEqual(response.status_code, http_status.HTTP_204_NO_CONTENT)
        self.assertEqual(Address.objects.filter(user=self.user).count(), 0)
