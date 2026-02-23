import type { User } from "@/lib/api";

export default function ProfileHeader({ user }: { user: User }) {
  return (
    <div className="card-brutal-pink">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={user.username}
            className="h-28 w-28 rounded-xl border-3 border-black shadow-brutal"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-xl border-3 border-black bg-brutal-pink text-5xl shadow-brutal">
            👤
          </div>
        )}

        <div className="text-center sm:text-left">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-black uppercase tracking-tight text-black">
              {user.username}
            </h1>
            {user.is_bot_verified && (
              <span className="badge-brutal bg-brutal-lime text-black">
                ✓ VERIFIED
              </span>
            )}
          </div>

          {user.bio && (
            <p className="mt-3 max-w-xl text-base font-semibold text-gray-600">
              {user.bio}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {user.location && (
              <span className="badge-brutal bg-brutal-cyan text-black">
                📍 {user.location}
              </span>
            )}
            {user.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="badge-brutal bg-brutal-blue text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
              >
                🔗 {new URL(user.website).hostname}
              </a>
            )}
            <span className="badge-brutal bg-brutal-muted text-gray-600">
              Joined {new Date(user.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
