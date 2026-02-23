from django.conf import settings
from django.db import models


class Contribution(models.Model):
    class ContributionType(models.TextChoices):
        PR = "PR", "Pull Request"
        COMMIT = "COMMIT", "Commit"
        ISSUE = "ISSUE", "Issue"

    class VerificationStatus(models.TextChoices):
        PENDING = "PENDING", "Pending"
        VERIFIED = "VERIFIED", "Verified"
        REJECTED = "REJECTED", "Rejected"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="contributions"
    )
    project = models.ForeignKey(
        "projects.Project", on_delete=models.CASCADE, related_name="contributions"
    )
    type = models.CharField(max_length=10, choices=ContributionType.choices)
    verification_status = models.CharField(
        max_length=10, choices=VerificationStatus.choices, default=VerificationStatus.PENDING
    )
    url = models.URLField(max_length=500)
    title = models.CharField(max_length=500)
    date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date"]

    def __str__(self):
        return f"{self.user.username} - {self.title}"
