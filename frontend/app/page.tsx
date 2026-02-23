import LaunchFeed from "@/components/LaunchFeed";
import type { Launch } from "@/lib/api";

// Placeholder data for initial render
const placeholderLaunches: Launch[] = [
  {
    id: 1,
    project: 1,
    project_detail: {
      id: 1,
      name: "DevTracker",
      slug: "devtracker",
      is_official: false,
      owner_org: "",
      repo_url: "https://github.com/example/devtracker",
      logo: "",
      description: "Track your development habits and productivity",
      tech_stack: ["React", "Node.js", "PostgreSQL"],
      owner: { id: 1, username: "sarah_dev", avatar_url: "", portfolio_slug: "sarah" },
      created_at: "2024-01-15T10:00:00Z",
    },
    launched_by: { id: 1, username: "sarah_dev", avatar_url: "" },
    launch_date: "2024-01-20T12:00:00Z",
    upvote_count: 42,
    seeking_help: true,
    description: "An open source tool to track your development habits. Looking for contributors!",
    created_at: "2024-01-20T12:00:00Z",
  },
  {
    id: 2,
    project: 2,
    project_detail: {
      id: 2,
      name: "GitViz",
      slug: "gitviz",
      is_official: true,
      owner_org: "opencoders",
      repo_url: "https://github.com/opencoders/gitviz",
      logo: "",
      description: "Beautiful visualizations for your Git history",
      tech_stack: ["TypeScript", "D3.js", "Rust"],
      owner: { id: 2, username: "alex_rust", avatar_url: "", portfolio_slug: "alex" },
      created_at: "2024-01-10T10:00:00Z",
    },
    launched_by: { id: 2, username: "alex_rust", avatar_url: "" },
    launch_date: "2024-01-18T09:00:00Z",
    upvote_count: 128,
    seeking_help: false,
    description: "Visualize your Git history like never before. v1.0 is here! 🎉",
    created_at: "2024-01-18T09:00:00Z",
  },
];

export default function Home() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-5xl font-extrabold text-black">
          🚀 Launchpad
        </h1>
        <p className="mt-3 text-lg font-bold text-gray-600">
          Discover and upvote the latest open source projects
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <LaunchFeed launches={placeholderLaunches} />
        </div>

        <aside className="space-y-6">
          <div className="card-brutal-yellow">
            <h3 className="font-extrabold text-black text-lg">🔥 Trending Tech</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {["TypeScript", "Rust", "Go", "Python", "React", "Svelte"].map(
                (tech) => (
                  <span key={tech} className="badge-brutal bg-white">
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="card-brutal-pink">
            <h3 className="font-extrabold text-black text-lg">🤝 Seeking Help</h3>
            <p className="mt-2 text-sm font-medium text-gray-700">
              Projects looking for contributors. Jump in and make your mark!
            </p>
            <a href="/explore?seeking_help=true" className="btn-brutal mt-4">
              Browse Projects
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
