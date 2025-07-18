from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils.jwt_utils import generate_jwt
from .serializers import RoadmapSerializer 
# RoadmapDetailSerializer, RoadmapListSerializer, TaskCompletionToggleSerializer

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
    
# class RoadmapByIdView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         user = request.user
#         roadmap_id = request.data.get("roadmap_id")

#         if not roadmap_id:
#             return Response({"message": "roadmap_id is required in the request body."}, status=400)

#         try:
#             roadmap = Roadmap.objects.get(id=roadmap_id, user=user)
#         except Roadmap.DoesNotExist:
#             return Response({"message": "Roadmap not found for this user."}, status=404)

#         serializer = RoadmapDetailSerializer(roadmap)
#         return Response(serializer.data)


# class RoadmapListByUserView(APIView):
#     def post(self, request):
#         user_id = request.data.get("user_id")

#         if not user_id:
#             return Response({"message": "user_id is required in the request body."}, status=400)

#         roadmaps = Roadmap.objects.filter(user_id=user_id).order_by("-created_at")

#         serializer = RoadmapListSerializer(roadmaps, many=True)
#         return Response(serializer.data)


# class ToggleTaskCompletionView(APIView):
#     def post(self, request):
#         serializer = TaskCompletionToggleSerializer(data=request.data)

#         if serializer.is_valid():
#             task = serializer.validated_data["task_instance"]
#             new_status = serializer.validated_data["completed"]

#             task.completed = new_status
#             task.save()

#             # Update week and roadmap progress
#             task.week.update_progress()

#             return Response({
#                 "message": f"Task marked as {'completed' if new_status else 'not completed'}.",
#                 "task_id": task.id,
#                 "week_progress": task.week.progress,
#                 "roadmap_progress": task.week.roadmap.progress
#             })

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)