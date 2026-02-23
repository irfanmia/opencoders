import Link from "next/link";
import type { Project } from "@/lib/api";

const accentColors = [
  { shadow: "shadow-brutal-lime", icon: "bg-brutal-lime" },
  { shadow: "shadow-brutal-pink", icon: "bg-brutal-pink" },
  { shadow: "shadow-brutal-blue", icon: "bg-brutal-blue" },
  { shadow: "shadow-brutal-yellow", icon: "bg-brutal-yellow" },
];

export default function ProjectCard({ project }: { project: Project }) {
  const accent = accentColors[project.id % accentColors.length];

  return (
    <div
      className={`rounded-xl border-3 border-black bg-white p-6 ${accent.shadow} transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none`}
    >
      <div className="flex items-start gap-4">
        {project.logo ? (
          <img
            src={project.logo}
            alt={project.name}
            className="h-14 w-14 rounded-lg border-3 border-black"
          />
        ) : (
          <div className={`flex h-14 w-14 items-center justify-center rounded-lg border-3 border-black ${accent.icon} text-2xl shadow-brutal-sm`}>
            📦
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-lg text-black truncate uppercase tracking-tight">
              {project.name}
            </h3>
            {project.is_official && (
              <span className="badge-brutal bg-brutal-yellow text-black">
                ✦ Official
              </span>
            )}
          </div>
          <p className="mt-2 text-sm font-semibold text-gray-600 line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech_stack.map((tech) => (
          <span
            key={tech}
            className="badge-brutal bg-brutal-muted text-black"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t-2 border-black/10 pt-4">
        <span className="text-sm font-bold text-gray-500">
          by <span className="text-brutal-pink font-extrabold">{project.owner.username}</span>
        </span>
        <Link
          href={project.repo_url}
          target="_blank"
          className="rounded-md border-2 border-black bg-brutal-muted px-3 py-1 text-xs font-extrabold uppercase text-black shadow-brutal-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none hover:bg-brutal-lime"
        >
          Repo →
        </Link>
      </div>
    </div>
  );
}
