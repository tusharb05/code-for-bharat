from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from .utils.jwt_utils import generate_jwt
from .serializers import RoadmapSerializer, RoadmapListSerializer, RoadmapDetailSerializer, TaskUpdateSerializer

from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from .authentication import SimpleJWTAuthentication

from .models import Roadmap, Week, Task

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
    

class BulkWeekCreateView(APIView):
    def post(self, request):
        roadmap_id = request.data.get("roadmap_id")
        if not roadmap_id:
            return Response({"error": "roadmap_id is required."}, status=status.HTTP_400_BAD_REQUEST)

        roadmap = get_object_or_404(Roadmap, id=roadmap_id)

        week_counter = 1
        created_weeks = []

        while f"week_{week_counter}" in request.data:
            week_data = request.data[f"week_{week_counter}"]

            week = Week.objects.create(
                roadmap=roadmap,
                title=week_data.get("title"),
                milestone=week_data.get("milestone", False),
                order=week_counter
            )

            task_objects = []
            for task_data in week_data.get("tasks", []):
                task_objects.append(Task(
                    week=week,
                    title=task_data.get("title"),
                    resource_link=task_data.get("resource_link"),
                    duration=task_data.get("duration"),
                    type=task_data.get("type")
                ))
            Task.objects.bulk_create(task_objects)

            created_weeks.append(week.id)
            week_counter += 1

        return Response(
            {"message": "Weeks and tasks created successfully.", "week_ids": created_weeks},
            status=status.HTTP_201_CREATED
        )



class UserRoadmapListView(ListAPIView):
    serializer_class = RoadmapListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Roadmap.objects.filter(user=self.request.user).order_by('-created_at')
    


class RoadmapDetailView(RetrieveAPIView):
    queryset = Roadmap.objects.all()
    serializer_class = RoadmapDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Roadmap.objects.filter(user=self.request.user)
    


class TaskCompletionUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        task = get_object_or_404(Task, pk=pk)

        serializer = TaskUpdateSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Task status updated successfully."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


