import type { Metadata } from "next";
import ProfileHeader from "@/components/ProfileHeader";
import ContributionCard from "@/components/ContributionCard";
import ProjectCard from "@/components/ProjectCard";
import type { User, Project, Contribution } from "@/lib/api";

interface ProfilePageProps {
  params: { username: string };
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { username } = params;
  return {
    title: `${username} — Open Coders`,
    description: `${username}'s developer portfolio on Open Coders`,
    openGraph: {
      title: `${username} — Open Coders`,
      description: `Check out ${username}'s open source contributions and projects`,
      url: `https://opencoders.org/${username}`,
      type: "profile",
      images: [
        {
          url: `https://api.opencoders.org/api/users/${username}/og-image/`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${username} — Open Coders`,
      description: `Check out ${username}'s open source contributions and projects`,
    },
  };
}

// Placeholder data
const placeholderUser: User = {
  id: 1,
  username: "sarah_dev",
  github_id: "12345",
  bio: "Full-stack developer passionate about open source. Building tools that make developers' lives easier.",
  portfolio_slug: "sarah",
  avatar_url: "",
  is_bot_verified: true,
  location: "San Francisco, CA",
  website: "https://sarah.dev",
  created_at: "2023-06-15T10:00:00Z",
  updated_at: "2024-01-20T10:00:00Z",
};

const placeholderProjects: Project[] = [
  {
    id: 1,
    name: "DevTracker",
    slug: "devtracker",
    is_official: false,
    owner_org: "",
    repo_url: "https://github.com/sarah_dev/devtracker",
    logo: "",
    description: "Track your development habits and boost productivity",
    tech_stack: ["React", "Node.js", "PostgreSQL"],
    owner: { id: 1, username: "sarah_dev", avatar_url: "", portfolio_slug: "sarah" },
    created_at: "2024-01-15T10:00:00Z",
  },
];

const placeholderContributions: Contribution[] = [
  {
    id: 1,
    user: { id: 1, username: "sarah_dev", avatar_url: "" },
    project: 1,
    type: "PR",
    verification_status: "VERIFIED",
    url: "https://github.com/example/repo/pull/42",
    title: "Add dark mode support to dashboard",
    date: "2024-01-19T15:30:00Z",
  },
  {
    id: 2,
    user: { id: 1, username: "sarah_dev", avatar_url: "" },
    project: 1,
    type: "ISSUE",
    verification_status: "VERIFIED",
    url: "https://github.com/example/repo/issues/38",
    title: "Fix memory leak in WebSocket handler",
    date: "2024-01-17T10:00:00Z",
  },
  {
    id: 3,
    user: { id: 1, username: "sarah_dev", avatar_url: "" },
    project: 2,
    type: "COMMIT",
    verification_status: "PENDING",
    url: "https://github.com/example/repo2/commit/abc123",
    title: "Refactor authentication middleware",
    date: "2024-01-16T08:00:00Z",
  },
];

export default function ProfilePage({ params }: ProfilePageProps) {
  const user = { ...placeholderUser, username: params.username };

  return (
    <div>
      <ProfileHeader user={user} />

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-extrabold text-black">
            Recent Contributions
          </h2>
          <div className="space-y-3">
            {placeholderContributions.map((c) => (
              <ContributionCard key={c.id} contribution={c} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-black">Projects</h2>
          {placeholderProjects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
