import type { Launch } from "@/lib/api";

const cardAccents = [
  "shadow-brutal-lime",
  "shadow-brutal-pink",
  "shadow-brutal-blue",
  "shadow-brutal-yellow",
];

export default function LaunchFeed({ launches }: { launches: Launch[] }) {
  if (launches.length === 0) {
    return (
      <div className="card-brutal text-center py-16">
        <p className="text-6xl mb-4">🚀</p>
        <p className="text-xl font-black uppercase text-gray-400">
          No launches yet. Be the first!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {launches.map((launch, i) => (
        <div
          key={launch.id}
          className={`rounded-xl border-3 border-black bg-white p-6 ${cardAccents[i % cardAccents.length]} transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              {launch.project_detail?.logo ? (
                <img
                  src={launch.project_detail.logo}
                  alt={launch.project_detail.name}
                  className="h-16 w-16 rounded-xl border-3 border-black"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-3 border-black bg-brutal-yellow text-3xl shadow-brutal-sm">
                  🚀
                </div>
              )}
              <div className="min-w-0">
                <h3 className="text-xl font-black uppercase tracking-tight text-black">
                  {launch.project_detail?.name}
                </h3>
                <p className="mt-2 text-sm font-semibold text-gray-600">
                  {launch.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="badge-brutal bg-brutal-pink/10 text-brutal-pink">
                    by {launch.launched_by.username}
                  </span>
                  <span className="badge-brutal bg-brutal-muted text-gray-500 font-mono">
                    {new Date(launch.launch_date).toLocaleDateString()}
                  </span>
                  {launch.seeking_help && (
                    <span className="badge-brutal bg-brutal-orange text-black animate-pulse">
                      🤝 SEEKING HELP
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 shrink-0">
              <button className="flex h-14 w-14 flex-col items-center justify-center rounded-lg border-3 border-black bg-white text-black shadow-brutal-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none hover:bg-brutal-lime">
                <span className="text-lg font-black">▲</span>
                <span className="text-xs font-extrabold">
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
