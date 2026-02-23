from rest_framework import viewsets, permissions
from .models import Contribution
from .serializers import ContributionSerializer


class ContributionViewSet(viewsets.ModelViewSet):
    queryset = Contribution.objects.select_related("user", "project").all()
    serializer_class = ContributionSerializer
    filterset_fields = ["user", "project", "type", "verification_status"]
    search_fields = ["title"]
    ordering_fields = ["date", "created_at"]

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticatedOrReadOnly()]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
