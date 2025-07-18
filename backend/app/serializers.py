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


class TaskRoadampDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'resource_link', 'duration', 'type', 'completed']

class WeekRoadmapDetailSerializer(serializers.ModelSerializer):
    tasks = TaskRoadampDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Week
        fields = ['id', 'title', 'order', 'milestone', 'progress', 'tasks']

class RoadmapDetailSerializer(serializers.ModelSerializer):
    weeks = WeekRoadmapDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Roadmap
        fields = ['id', 'goal', 'timeline_weeks', 'parsed_resume', 'created_at', 'progress', 'weeks']


class TaskUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['completed']

    def update(self, instance, validated_data):
        instance.completed = validated_data.get('completed', instance.completed)
        instance.save()
        instance.week.update_progress()  # This also updates roadmap progress
        return instance


class RoadmapListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roadmap
        fields = ['id', 'goal', 'timeline_weeks', 'parsed_resume', 'created_at', 'progress']


