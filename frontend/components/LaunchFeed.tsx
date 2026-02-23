import type { Launch } from "@/lib/api";

export default function LaunchFeed({ launches }: { launches: Launch[] }) {
  if (launches.length === 0) {
    return (
      <div className="card-clean text-center py-16">
        <p className="text-6xl mb-4">🚀</p>
        <p className="text-xl font-semibold text-gray-400">
          No launches yet. Be the first!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {launches.map((launch) => (
        <div
          key={launch.id}
          className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              {launch.project_detail?.logo ? (
                <img
                  src={launch.project_detail.logo}
                  alt={launch.project_detail.name}
                  className="h-16 w-16 rounded-xl border border-gray-200"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary-light border border-green-100 text-3xl">
                  🚀
                </div>
              )}
              <div className="min-w-0">
                <h3 className="text-xl font-semibold text-gray-900">
                  {launch.project_detail?.name}
                </h3>
                <p className="mt-2 text-sm font-normal text-gray-500">
                  {launch.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="badge-clean bg-primary-light text-primary-dark">
                    by {launch.launched_by.username}
                  </span>
                  <span className="badge-clean bg-section text-gray-500">
                    {new Date(launch.launch_date).toLocaleDateString()}
                  </span>
                  {launch.seeking_help && (
                    <span className="badge-clean bg-primary text-white animate-pulse">
                      🤝 Seeking Help
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 shrink-0">
              <button className="flex h-14 w-14 flex-col items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-primary-light hover:border-primary">
                <span className="text-lg font-bold">▲</span>
                <span className="text-xs font-semibold">
                  {launch.upvote_count}
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
