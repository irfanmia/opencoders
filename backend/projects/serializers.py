from rest_framework import serializers
from .models import Project
from users.serializers import UserMinimalSerializer


class ProjectSerializer(serializers.ModelSerializer):
    owner = UserMinimalSerializer(read_only=True)
    star_count = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id", "name", "slug", "is_official", "owner_org", "repo_url",
            "logo", "description", "tech_stack", "readme_content", "owner",
            "star_count", "created_at", "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def get_star_count(self, obj):
        return obj.stars.count()


class ProjectListSerializer(serializers.ModelSerializer):
    owner = UserMinimalSerializer(read_only=True)

    class Meta:
        model = Project
        fields = [
            "id", "name", "slug", "is_official", "owner_org", "logo",
            "description", "tech_stack", "owner", "created_at",
        ]
