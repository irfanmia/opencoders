import type { Contribution } from "@/lib/api";

const typeStyles = {
  PR: { bg: "bg-brutal-green-light", icon: "🔀" },
  COMMIT: { bg: "bg-brutal-green-pale", icon: "📝" },
  ISSUE: { bg: "bg-brutal-green-light", icon: "🐛" },
};

const statusStyles = {
  PENDING: "bg-brutal-green-light text-brutal-green-dark",
  VERIFIED: "bg-brutal-green text-white",
  REJECTED: "bg-red-100 text-red-700",
};

export default function ContributionCard({
  contribution,
}: {
  contribution: Contribution;
}) {
  const style = typeStyles[contribution.type];

  return (
    <div className="flex items-center gap-4 rounded-xl border border-black/20 bg-white p-4 shadow-brutal-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-black/20 ${style.bg} text-xl`}
      >
        {style.icon}
      </div>

      <div className="flex-1 min-w-0">
        <a
          href={contribution.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-black text-black hover:text-brutal-green truncate block transition-colors"
        >
          {contribution.title}
        </a>
        <div className="mt-2 flex items-center gap-2">
          <span className={`badge-brutal ${style.bg} text-brutal-green-dark`}>
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
