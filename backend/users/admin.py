from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ["username", "email", "github_id", "is_bot_verified", "created_at"]
    list_filter = ["is_bot_verified", "is_staff"]
    fieldsets = BaseUserAdmin.fieldsets + (
        ("Open Coders", {"fields": ("github_id", "bio", "portfolio_slug", "avatar_url", "is_bot_verified", "location", "website")}),
    )
