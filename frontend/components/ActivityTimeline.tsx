import type { Contribution } from "@/lib/api";
import { timeAgo, getProjectById } from "@/lib/mock-data";

const typeIcons: Record<string, { icon: string; bg: string }> = {
  PR: { icon: "🔀", bg: "bg-brutal-green" },
  COMMIT: { icon: "📝", bg: "bg-brutal-green-light" },
  ISSUE: { icon: "🐛", bg: "bg-brutal-green-pale" },
};

export default function ActivityTimeline({ contributions }: { contributions: Contribution[] }) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-brutal-green/30" />
      {contributions.map((c) => {
        const style = typeIcons[c.type];
        const project = getProjectById(c.project);
        return (
          <div key={c.id} className="relative mb-5 last:mb-0">
            <div className={`absolute -left-5 flex h-8 w-8 items-center justify-center rounded-lg border border-black/20 ${style.bg} text-sm`}>
              {style.icon}
            </div>
            <div className="ml-6 rounded-xl border border-black/15 bg-white p-4 shadow-brutal-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none">
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-black text-black hover:text-brutal-green transition-colors text-sm">
                {c.title}
              </a>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {project && (
                  <span className="text-xs font-bold text-brutal-green">{project.name}</span>
                )}
                <span className="text-xs font-bold text-gray-400">{timeAgo(c.date)}</span>
                {c.verification_status === "VERIFIED" && (
                  <span className="inline-flex items-center rounded border border-brutal-green/30 bg-brutal-green-light px-1.5 py-0.5 text-[10px] font-extrabold uppercase text-brutal-green-dark">✓ Verified</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
