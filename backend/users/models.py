from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    github_id = models.CharField(max_length=100, blank=True, unique=True, null=True)
    bio = models.TextField(blank=True, default="")
    portfolio_slug = models.SlugField(max_length=100, unique=True, null=True, blank=True)
    avatar_url = models.URLField(max_length=500, blank=True, default="")
    is_bot_verified = models.BooleanField(default=False)
    location = models.CharField(max_length=200, blank=True, default="")
    website = models.URLField(max_length=500, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.username
