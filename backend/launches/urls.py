from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LaunchViewSet, StarViewSet

router = DefaultRouter()
router.register("launches", LaunchViewSet, basename="launch")
router.register("stars", StarViewSet, basename="star")

urlpatterns = [
    path("", include(router.urls)),
]
