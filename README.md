# Open Coders 🚀

**opencoders.org** — A developer portfolio & project launchpad platform.

## Architecture

- **Frontend:** Next.js 14+ (App Router) + Tailwind CSS + TypeScript
- **Backend:** Django 5 + Django REST Framework
- **Database:** PostgreSQL 16
- **Cache/Broker:** Redis 7
- **Task Queue:** Celery

## Quick Start (Docker)

```bash
cp .env.example .env
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/
- Admin: http://localhost:8000/admin/

## Frontend Setup (Local)

```bash
cd frontend
npm install
npm run dev
```

## Backend Setup (Local)

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Environment Variables

See `.env.example` for all required variables.

## GitHub OAuth

1. Create a GitHub OAuth App at https://github.com/settings/developers
2. Set callback URL to `https://api.opencoders.org/accounts/github/login/callback/`
3. Add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` to `.env`

## Project Structure

```
opencoders/
├── frontend/          # Next.js 14 App Router
│   ├── app/           # Pages & layouts
│   ├── components/    # Reusable components
│   └── lib/           # API service layer
├── backend/           # Django + DRF
│   ├── opencoders/    # Django project settings
│   ├── users/         # User profiles & auth
│   ├── projects/      # Project listings
│   ├── contributions/ # GitHub contributions
│   └── launches/      # Project launchpad
├── docker-compose.yml
└── .env.example
```
