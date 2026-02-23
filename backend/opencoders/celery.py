import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "opencoders.settings")

app = Celery("opencoders")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
