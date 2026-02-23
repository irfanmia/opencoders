from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/users/", include("users.urls")),
    path("api/projects/", include("projects.urls")),
    path("api/contributions/", include("contributions.urls")),
    path("api/launches/", include("launches.urls")),
    path("accounts/", include("allauth.urls")),
]
