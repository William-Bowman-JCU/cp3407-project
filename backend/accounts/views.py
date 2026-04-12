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


@api_view(['GET', 'PUT'])
def account_view(request):
    """
    GET  /api/account/?email=<email>  — fetch current profile
    PUT  /api/account/                — update name, email and/or password
    """
    email = request.GET.get('email') or request.data.get('email')

    if not email:
        return Response({'error': 'Email required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(username=email)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response({
            'name': user.get_full_name(),
            'email': user.email,
        })

    # PUT — update profile fields
    new_name = request.data.get('name', '').strip()
    new_email = request.data.get('new_email', '').strip()
    new_password = request.data.get('new_password', '').strip()

    if new_name:
        first_name, *last_name = new_name.split(' ')
        user.first_name = first_name
        user.last_name = ' '.join(last_name)

    if new_email and new_email != user.email:
        if User.objects.filter(username=new_email).exists():
            return Response({'error': 'Email already in use'}, status=status.HTTP_400_BAD_REQUEST)
        user.email = new_email
        user.username = new_email

    if new_password:
        if len(new_password) < 8:
            return Response({'error': 'Password must be at least 8 characters'}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(new_password)

    user.save()
    return Response({
        'message': 'Account updated successfully',
        'user': {'email': user.email, 'name': user.get_full_name()}
    })