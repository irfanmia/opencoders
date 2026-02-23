import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/api";

const placeholderProjects: Project[] = [
  {
    id: 1,
    name: "DevTracker",
    slug: "devtracker",
    is_official: false,
    owner_org: "",
    repo_url: "https://github.com/example/devtracker",
    logo: "",
    description: "Track your development habits and boost productivity with smart insights.",
    tech_stack: ["React", "Node.js", "PostgreSQL"],
    owner: { id: 1, username: "sarah_dev", avatar_url: "", portfolio_slug: "sarah" },
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    name: "GitViz",
    slug: "gitviz",
    is_official: true,
    owner_org: "opencoders",
    repo_url: "https://github.com/opencoders/gitviz",
    logo: "",
    description: "Beautiful, interactive visualizations for your Git history and contribution patterns.",
    tech_stack: ["TypeScript", "D3.js", "Rust"],
    owner: { id: 2, username: "alex_rust", avatar_url: "", portfolio_slug: "alex" },
    created_at: "2024-01-10T10:00:00Z",
  },
  {
    id: 3,
    name: "CodeReview Bot",
    slug: "codereview-bot",
    is_official: false,
    owner_org: "",
    repo_url: "https://github.com/example/codereview-bot",
    logo: "",
    description: "AI-powered code review assistant that integrates with GitHub PRs.",
    tech_stack: ["Python", "FastAPI", "OpenAI"],
    owner: { id: 3, username: "ml_ninja", avatar_url: "", portfolio_slug: "ml-ninja" },
    created_at: "2024-01-08T10:00:00Z",
  },
];

export default function ExplorePage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-5xl font-extrabold text-black">🔍 Explore Projects</h1>
        <p className="mt-3 text-lg font-bold text-gray-600">
          Discover open source projects from the community
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search projects..."
          className="input-brutal flex-1"
        />
        <select className="rounded-xl border-3 border-black bg-white px-4 py-3 font-bold text-black shadow-brutal focus:shadow-brutal-lime focus:outline-none">
          <option>All Tech</option>
          <option>TypeScript</option>
          <option>Python</option>
          <option>Rust</option>
          <option>Go</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
