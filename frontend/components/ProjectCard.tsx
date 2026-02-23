import Link from "next/link";
import type { Project } from "@/lib/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {project.logo ? (
          <img
            src={project.logo}
            alt={project.name}
            className="h-14 w-14 rounded-lg border border-gray-200"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary-light border border-green-100 text-2xl">
            📦
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg text-gray-900 truncate">
              {project.name}
            </h3>
            {project.is_official && (
              <span className="badge-clean bg-primary-light text-primary-dark">
                ✦ Official
              </span>
            )}
          </div>
          <p className="mt-2 text-sm font-normal text-gray-500 line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech_stack.map((tech) => (
          <span key={tech} className="badge-clean bg-section text-gray-600 border border-gray-200">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-sm font-normal text-gray-500">
          by <span className="text-primary font-medium">{project.owner.username}</span>
        </span>
        <Link
          href={project.repo_url}
          target="_blank"
          className="rounded-lg border border-gray-200 bg-section px-3 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-primary-light hover:text-primary"
        >
          Repo →
        </Link>
      </div>
    </div>
  );
}
