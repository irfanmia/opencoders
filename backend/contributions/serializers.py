from rest_framework import serializers
from .models import Contribution
from users.serializers import UserMinimalSerializer


class ContributionSerializer(serializers.ModelSerializer):
    user = UserMinimalSerializer(read_only=True)

    class Meta:
        model = Contribution
        fields = [
            "id", "user", "project", "type", "verification_status",
            "url", "title", "date", "created_at",
        ]
        read_only_fields = ["id", "created_at", "verification_status"]
