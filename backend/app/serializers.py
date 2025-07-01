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
