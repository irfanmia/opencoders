from rest_framework import serializers
from .models import Launch, Star
from users.serializers import UserMinimalSerializer
from projects.serializers import ProjectListSerializer


class LaunchSerializer(serializers.ModelSerializer):
    launched_by = UserMinimalSerializer(read_only=True)
    project_detail = ProjectListSerializer(source="project", read_only=True)

    class Meta:
        model = Launch
        fields = [
            "id", "project", "project_detail", "launched_by", "launch_date",
            "upvote_count", "seeking_help", "description", "created_at", "updated_at",
        ]
        read_only_fields = ["id", "upvote_count", "created_at", "updated_at"]


class StarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Star
        fields = ["id", "from_user", "content_type", "object_id", "created_at"]
        read_only_fields = ["id", "from_user", "created_at"]
