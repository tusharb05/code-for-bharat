# serializers.py
from rest_framework import serializers
from .models import Roadmap
from PyPDF2 import PdfReader
from .utils.resume_parser import extract_sections

class RoadmapSerializer(serializers.ModelSerializer):
    resume = serializers.FileField(write_only=True)

    class Meta:
        model = Roadmap
        fields = ['goal', 'timeline_weeks', 'resume']

    def create(self, validated_data):
        resume_file = validated_data.pop('resume')
        resume_file.seek(0)
        reader = PdfReader(resume_file)
        full_text = []
        for page in reader.pages:
            text = page.extract_text()
            if text:
                full_text.append(text)
        parsed = "".join(full_text)

        # Extract structured data
        extracted_data = extract_sections(parsed)

        # Get user from JWT-authenticated request context
        user = self.context['request'].user

        # Create the roadmap
        return Roadmap.objects.create(
            user=user,
            parsed_resume=extracted_data,
            **validated_data
        )


from rest_framework import serializers
from .models import Roadmap, Week, Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['title', 'resource_link', 'duration', 'type']

class WeekWithTasksSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True)

    class Meta:
        model = Week
        fields = ['title', 'milestone', 'tasks']

# class TaskSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Task
#         fields = ['id', 'title', 'resource_link', 'duration', 'type', 'completed']


# class WeekSerializer(serializers.ModelSerializer):
#     tasks = TaskSerializer(many=True, read_only=True)

#     class Meta:
#         model = Week
#         fields = ['id', 'title', 'order', 'milestone', 'progress', 'tasks']


# class RoadmapDetailSerializer(serializers.ModelSerializer):
#     weeks = WeekSerializer(many=True, read_only=True)

#     class Meta:
#         model = Roadmap
#         fields = [
#             'id', 'goal', 'timeline_weeks', 'parsed_resume',
#             'progress', 'created_at', 'weeks'
#         ]


# class RoadmapListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Roadmap
#         fields = [
#             'id',
#             'goal',
#             'timeline_weeks',
#             'progress',
#             'created_at',
#         ]


# class TaskCompletionToggleSerializer(serializers.Serializer):
#     user_id = serializers.IntegerField()
#     task_id = serializers.IntegerField()
#     completed = serializers.BooleanField()

#     def validate(self, data):
#         task_id = data.get("task_id")
#         user_id = data.get("user_id")

#         try:
#             task = Task.objects.select_related("week__roadmap__user").get(id=task_id)
#         except Task.DoesNotExist:
#             raise serializers.ValidationError("Invalid task_id provided.")

#         if task.week.roadmap.user.id != user_id:
#             raise serializers.ValidationError("Task does not belong to this user.")

#         data["task_instance"] = task
#         return data