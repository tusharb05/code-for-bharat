from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils.jwt_utils import generate_jwt
from .serializers import RoadmapSerializer

from rest_framework.permissions import IsAuthenticated
from .authentication import SimpleJWTAuthentication

User = get_user_model()

class RegisterView(APIView):
    def post(self, request):
        full_name = request.data.get('full_name')
        email = request.data.get('email')
        password = request.data.get('password')

        if not all([full_name, email, password]):
            return Response({'detail': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'detail': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create(
            full_name=full_name,
            email=email,
            password=make_password(password)
        )

        token = generate_jwt(user)
        return Response({'token': token}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not all([email, password]):
            return Response({'detail': 'Email and password required'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, email=email, password=password)
        if user is None:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        token = generate_jwt(user)
        return Response({'token': token}, status=status.HTTP_200_OK)


class CreateRoadmapView(APIView):
    authentication_classes = [SimpleJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = RoadmapSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            roadmap = serializer.save()
            return Response({"msg": "good"}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)