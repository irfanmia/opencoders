import type { Contribution } from "@/lib/api";
import { timeAgo, getProjectById } from "@/lib/mock-data";

const typeIcons: Record<string, { icon: string; bg: string }> = {
  PR: { icon: "🔀", bg: "bg-brutal-lime" },
  COMMIT: { icon: "📝", bg: "bg-brutal-blue" },
  ISSUE: { icon: "🐛", bg: "bg-brutal-yellow" },
};

export default function ActivityTimeline({ contributions }: { contributions: Contribution[] }) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-3 top-0 bottom-0 w-[3px] bg-black" />
      {contributions.map((c) => {
        const style = typeIcons[c.type];
        const project = getProjectById(c.project);
        return (
          <div key={c.id} className="relative mb-5 last:mb-0">
            <div className={`absolute -left-5 flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black ${style.bg} text-sm`}>
              {style.icon}
            </div>
            <div className="ml-6 rounded-xl border-2 border-black bg-white p-4 shadow-brutal-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none">
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-black text-black hover:text-brutal-pink transition-colors text-sm">
                {c.title}
              </a>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {project && (
                  <span className="text-xs font-bold text-brutal-blue">{project.name}</span>
                )}
                <span className="text-xs font-bold text-gray-400">{timeAgo(c.date)}</span>
                {c.verification_status === "VERIFIED" && (
                  <span className="inline-flex items-center rounded border border-black bg-brutal-lime/30 px-1.5 py-0.5 text-[10px] font-extrabold uppercase">✓ Verified</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
