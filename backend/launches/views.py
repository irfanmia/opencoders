from rest_framework import viewsets, permissions
from .models import Launch, Star
from .serializers import LaunchSerializer, StarSerializer


class LaunchViewSet(viewsets.ModelViewSet):
    queryset = Launch.objects.select_related("project", "launched_by").all()
    serializer_class = LaunchSerializer
    filterset_fields = ["seeking_help", "project"]
    search_fields = ["description", "project__name"]
    ordering_fields = ["launch_date", "upvote_count", "created_at"]

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticatedOrReadOnly()]

    def perform_create(self, serializer):
        serializer.save(launched_by=self.request.user)


class StarViewSet(viewsets.ModelViewSet):
    queryset = Star.objects.all()
    serializer_class = StarSerializer
    filterset_fields = ["from_user", "content_type", "object_id"]
    http_method_names = ["get", "post", "delete", "head", "options"]

    def get_permissions(self):
        if self.action in ["create", "destroy"]:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticatedOrReadOnly()]

    def perform_create(self, serializer):
        serializer.save(from_user=self.request.user)
