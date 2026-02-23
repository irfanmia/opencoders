from django.contrib import admin
from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["name", "owner", "is_official", "owner_org", "created_at"]
    list_filter = ["is_official"]
    search_fields = ["name", "description"]
    prepopulated_fields = {"slug": ("name",)}
