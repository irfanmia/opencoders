from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id", "username", "github_id", "bio", "portfolio_slug",
            "avatar_url", "is_bot_verified", "location", "website",
            "created_at", "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "is_bot_verified"]


class UserMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "avatar_url", "portfolio_slug"]
