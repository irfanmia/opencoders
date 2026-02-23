import type { Contribution } from "@/lib/types";
import { timeAgo } from "@/lib/utils";

const typeIcons: Record<string, { icon: string; bg: string }> = {
  PR: { icon: "🔀", bg: "bg-primary-light" },
  COMMIT: { icon: "📝", bg: "bg-primary-pale" },
  ISSUE: { icon: "🐛", bg: "bg-primary-light" },
};

export default function ActivityTimeline({ contributions }: { contributions: Contribution[] }) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-gray-200" />
      {contributions.map((c) => {
        const style = typeIcons[c.type];
        return (
          <div key={c.id} className="relative mb-5 last:mb-0">
            <div className={`absolute -left-5 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 ${style.bg} text-sm`}>
              {style.icon}
            </div>
            <div className="ml-6 rounded-xl bg-white p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-900 hover:text-primary transition-colors text-sm">
                {c.title}
              </a>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {c.project_name && (
                  <span className="text-xs font-medium text-primary">{c.project_name}</span>
                )}
                <span className="text-xs font-normal text-gray-400">{timeAgo(c.date)}</span>
                {c.verification_status === "VERIFIED" && (
                  <span className="inline-flex items-center rounded-full bg-primary-light px-1.5 py-0.5 text-[10px] font-medium text-primary-dark">✓ Verified</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
