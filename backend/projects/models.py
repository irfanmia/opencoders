from django.conf import settings
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    is_official = models.BooleanField(default=False)
    owner_org = models.CharField(max_length=255, blank=True, default="")
    repo_url = models.URLField(max_length=500)
    logo = models.URLField(max_length=500, blank=True, default="")
    description = models.TextField(blank=True, default="")
    tech_stack = models.JSONField(default=list, blank=True)
    readme_content = models.TextField(blank=True, default="")
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="projects"
    )
    stars = GenericRelation("launches.Star")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name
