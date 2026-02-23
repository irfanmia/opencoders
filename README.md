# Open Coders 🚀

**[opencoders.org](https://opencoders-psi.vercel.app)** — An open-source contributor portfolio platform. Think developer Behance + Product Hunt for OSS.

Showcase your contributions, discover amazing projects, and connect with maintainers & recruiters — all in one place.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-336791?logo=postgresql) ![Drizzle](https://img.shields.io/badge/Drizzle_ORM-latest-green)

## Features

- 🔗 **Multi-platform support** — GitHub, GitLab, Bitbucket, or manual project entry
- 🎨 **Developer portfolios** — Showcase your contributions, skills, and projects
- 🚀 **Project launchpad** — Launch projects, get upvotes, find contributors
- 👤 **GitHub auto-populate** — Sign in with GitHub and your profile is auto-filled
- ✏️ **Inline profile editing** — Edit your profile directly from your profile page
- ⭐ **Follow & Star** — Follow developers and star profiles
- 📦 **GitHub repo import** — Import your repos as projects with one click
- 🏆 **Leaderboard** — Top contributors ranked by activity
- 🔍 **Explore** — Search and filter projects and developers

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 14](https://nextjs.org) (App Router) |
| Language | [TypeScript](https://typescriptlang.org) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| Database | [Neon](https://neon.tech) (Serverless PostgreSQL) |
| ORM | [Drizzle ORM](https://orm.drizzle.team) |
| Auth | [NextAuth.js v5](https://authjs.dev) (GitHub OAuth) |
| Hosting | [Vercel](https://vercel.com) |
| Fonts | Manrope (headings) + Inter (body) |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) database (free tier works)
- A [GitHub OAuth App](https://github.com/settings/developers)

### Setup

```bash
# Clone the repo
git clone https://github.com/irfanmia/opencoders.git
cd opencoders/frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values (see Environment Variables below)

# Push the database schema
npx drizzle-kit push

# Seed with demo data (optional)
npm run db:demo

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
# Database
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret
AUTH_SECRET=your-random-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set **Homepage URL** to `http://localhost:3000` (or your production URL)
4. Set **Authorization callback URL** to `http://localhost:3000/api/auth/callback/github`
5. Copy the Client ID and Client Secret to `.env.local`

## Project Structure

```
opencoders/
└── frontend/                # Next.js application
    ├── app/                 # Pages & layouts
    │   ├── api/             # API routes
    │   │   ├── users/       # User endpoints
    │   │   ├── projects/    # Project endpoints
    │   │   ├── contributions/
    │   │   ├── launches/    # Launchpad endpoints
    │   │   ├── leaderboard/ # Top contributors
    │   │   └── github/      # GitHub integration (profile, repos, import)
    │   ├── [username]/      # Profile pages
    │   ├── explore/         # Search & discover
    │   ├── launchpad/       # Project launches
    │   ├── settings/        # Profile settings
    │   └── login/           # Authentication
    ├── components/          # Reusable UI components
    ├── lib/                 # Core libraries
    │   ├── auth.ts          # NextAuth config
    │   ├── db.ts            # Neon + Drizzle connection
    │   ├── schema.ts        # Database schema (7 tables)
    │   ├── types.ts         # TypeScript types
    │   └── utils.ts         # Helper functions
    ├── scripts/             # Database scripts
    │   ├── demo-data.ts     # Demo data seeder
    │   └── seed-data.ts     # Base seed data
    └── types/               # Type extensions
        └── next-auth.d.ts   # NextAuth type augmentation
```

## Database Schema

7 tables: `users`, `projects`, `contributions`, `launches`, `stars`, `upvotes`, `follows`

Run `npx drizzle-kit studio` to explore the database visually.

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run db:push      # Push schema to database
npm run db:generate  # Generate migrations
npm run db:migrate   # Run migrations
npm run db:studio    # Open Drizzle Studio
npm run db:demo      # Seed database with demo data
```

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## License

MIT

---

Built with ❤️ by the open source community.
