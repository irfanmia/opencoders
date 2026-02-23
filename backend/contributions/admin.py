from django.contrib import admin
from .models import Contribution


@admin.register(Contribution)
class ContributionAdmin(admin.ModelAdmin):
    list_display = ["user", "project", "type", "verification_status", "date"]
    list_filter = ["type", "verification_status"]
    search_fields = ["title", "user__username"]
