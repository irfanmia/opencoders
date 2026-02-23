from rest_framework import viewsets, permissions
from .models import Project
from .serializers import ProjectSerializer, ProjectListSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.select_related("owner").all()
    lookup_field = "slug"
    filterset_fields = ["is_official", "owner_org"]
    search_fields = ["name", "description", "tech_stack"]
    ordering_fields = ["created_at", "name"]

    def get_serializer_class(self):
        if self.action == "list":
            return ProjectListSerializer
        return ProjectSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticatedOrReadOnly()]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
