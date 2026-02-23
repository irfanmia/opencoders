import type { Contribution } from "@/lib/api";

const typeStyles = {
  PR: { bg: "bg-brutal-lime", icon: "🔀" },
  COMMIT: { bg: "bg-brutal-blue", icon: "📝" },
  ISSUE: { bg: "bg-brutal-yellow", icon: "🐛" },
};

const statusStyles = {
  PENDING: "bg-brutal-yellow text-black",
  VERIFIED: "bg-brutal-lime text-black",
  REJECTED: "bg-brutal-red text-white",
};

export default function ContributionCard({
  contribution,
}: {
  contribution: Contribution;
}) {
  const style = typeStyles[contribution.type];

  return (
    <div className="flex items-center gap-4 rounded-xl border-3 border-black bg-white p-4 shadow-brutal-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-3 border-black ${style.bg} text-xl`}
      >
        {style.icon}
      </div>

      <div className="flex-1 min-w-0">
        <a
          href={contribution.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-black text-black hover:text-brutal-pink truncate block transition-colors"
        >
          {contribution.title}
        </a>
        <div className="mt-2 flex items-center gap-2">
          <span className={`badge-brutal ${style.bg} text-black`}>
            {contribution.type}
          </span>
          <span className={`badge-brutal ${statusStyles[contribution.verification_status]}`}>
            {contribution.verification_status}
          </span>
          <span className="text-xs font-bold text-gray-400 font-mono">
            {new Date(contribution.date).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
