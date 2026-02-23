import type { Contribution } from "@/lib/api";

const typeStyles = {
  PR: { bg: "bg-primary-light", icon: "🔀" },
  COMMIT: { bg: "bg-primary-pale", icon: "📝" },
  ISSUE: { bg: "bg-primary-light", icon: "🐛" },
};

const statusStyles = {
  PENDING: "bg-primary-light text-primary-dark",
  VERIFIED: "bg-primary text-white",
  REJECTED: "bg-red-50 text-red-600",
};

export default function ContributionCard({
  contribution,
}: {
  contribution: Contribution;
}) {
  const style = typeStyles[contribution.type];

  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${style.bg} border border-green-100 text-xl`}
      >
        {style.icon}
      </div>

      <div className="flex-1 min-w-0">
        <a
          href={contribution.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-gray-900 hover:text-primary truncate block transition-colors"
        >
          {contribution.title}
        </a>
        <div className="mt-2 flex items-center gap-2">
          <span className={`badge-clean ${style.bg} text-primary-dark`}>
            {contribution.type}
          </span>
          <span className={`badge-clean ${statusStyles[contribution.verification_status]}`}>
            {contribution.verification_status}
          </span>
          <span className="text-xs font-normal text-gray-400">
            {new Date(contribution.date).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
