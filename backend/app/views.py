from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from .utils.jwt_utils import generate_jwt
from .serializers import RoadmapSerializer, RoadmapListSerializer, RoadmapDetailSerializer, TaskUpdateSerializer, CredentialSerializer

from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from .authentication import SimpleJWTAuthentication

from .models import Roadmap, Week, Task, Credential

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


# class CreateRoadmapView(APIView):
#     authentication_classes = [SimpleJWTAuthentication]
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         serializer = RoadmapSerializer(data=request.data, context={'request': request})

#         if serializer.is_valid():
#             roadmap = serializer.save()
#             return Response({"msg": "good"}, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

import json
import requests

class CreateRoadmapView(APIView):
    authentication_classes = [SimpleJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # 1️⃣ Save the roadmap + parsed_resume
        serializer = RoadmapSerializer(data=request.data, context={'request': request})
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        roadmap = serializer.save()

        # 2️⃣ Extract skills list from the JSON stored in parsed_resume
        try:
            parsed = json.loads(roadmap.parsed_resume)
            skills_list = parsed.get("skills", [])
            if not isinstance(skills_list, list):
                skills_list = [skills_list]
        except (ValueError, TypeError):
            skills_list = []
        skills_str = ", ".join(skills_list)

        # 3️⃣ Call the external plan-generator
        payload = {
            "goal": roadmap.goal,
            "duration": str(roadmap.timeline_weeks),
            "skills": skills_str
        }
        try:
            resp = requests.post(
                "https://curricula-tbli.onrender.com/generate-plan",
                json=payload,
                timeout=240
            )
            resp.raise_for_status()
            plan = resp.json()
        except requests.RequestException as e:
            roadmap.delete()
            return Response(
                {"error": "Plan generation failed", "details": str(e)},
                status=status.HTTP_502_BAD_GATEWAY
            )

        # 4️⃣ Persist weeks & tasks
        for week_key, week_data in plan.items():
            order = 0
            try:
                order = int(week_key.split("_", 1)[1])
            except Exception:
                pass

            week = Week.objects.create(
                roadmap=roadmap,
                title=week_data.get("title", ""),
                milestone=week_data.get("milestone", False),
                order=order
            )

            tasks = [
                Task(
                    week=week,
                    title=t.get("title",""),
                    resource_link=t.get("resource_link",""),
                    duration=t.get("duration",0),
                    type=t.get("type", Task.ARTICLE)
                )
                for t in week_data.get("tasks", [])
            ]
            Task.objects.bulk_create(tasks)

        # 5️⃣ Recompute overall progress
        roadmap.update_progress()

        return Response(
            {"message": "Roadmap created and plan imported.", "roadmap_id": roadmap.id},
            status=status.HTTP_201_CREATED
        )


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



class CreateCredentialView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CredentialSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class DeleteCredentialView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, credential_id):
        try:
            credential = Credential.objects.get(id=credential_id, user=request.user)
            credential.delete()
            return Response({"message": "Credential deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Credential.DoesNotExist:
            return Response({"error": "Credential not found."}, status=status.HTTP_404_NOT_FOUND)
        

class ListUserCredentialsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        credentials = Credential.objects.filter(user=request.user).order_by('-issuance_date')
        serializer = CredentialSerializer(credentials, many=True)
        return Response(serializer.data)