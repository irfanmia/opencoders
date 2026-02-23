from celery import shared_task
import logging

logger = logging.getLogger(__name__)


@shared_task
def fetch_github_repos(user_id: int):
    """Fetch and sync GitHub repositories for a user."""
    from users.models import User

    try:
        user = User.objects.get(id=user_id)
        logger.info(f"Fetching GitHub repos for {user.username} (github_id={user.github_id})")
        # TODO: Implement GitHub API call
        # 1. GET /users/{username}/repos
        # 2. Create/update Project objects
        # 3. Sync tech_stack from repo languages
    except User.DoesNotExist:
        logger.error(f"User {user_id} not found")


@shared_task
def fetch_github_contributions(user_id: int):
    """Fetch recent GitHub contributions (PRs, commits, issues) for a user."""
    from users.models import User

    try:
        user = User.objects.get(id=user_id)
        logger.info(f"Fetching contributions for {user.username}")
        # TODO: Implement GitHub API call
        # 1. GET /search/issues?q=author:{username}+type:pr
        # 2. GET /search/issues?q=author:{username}+type:issue
        # 3. Create Contribution objects with verification_status=PENDING
    except User.DoesNotExist:
        logger.error(f"User {user_id} not found")
