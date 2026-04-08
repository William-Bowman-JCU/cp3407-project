from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST'])
def register_view(request):
    name = request.data.get('name')
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password or not name:
        return Response({'error': 'All fields required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=email).exists():
        return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)

    first_name, *last_name = name.split(' ')
    user = User.objects.create_user(
        username=email,
        email=email,
        password=password,
        first_name=first_name,
        last_name=' '.join(last_name)
    )

    return Response({'message': 'Account created successfully'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=email, password=password)

    if user is not None:
        return Response({'message': 'Login successful', 'user': {'email': user.email, 'name': user.get_full_name()}})
    else:
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)