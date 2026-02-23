from django.contrib import admin
from .models import Launch, Star


@admin.register(Launch)
class LaunchAdmin(admin.ModelAdmin):
    list_display = ["project", "launched_by", "launch_date", "upvote_count", "seeking_help"]
    list_filter = ["seeking_help", "launch_date"]
    search_fields = ["project__name", "description"]


@admin.register(Star)
class StarAdmin(admin.ModelAdmin):
    list_display = ["from_user", "content_type", "object_id", "created_at"]
    list_filter = ["content_type"]
