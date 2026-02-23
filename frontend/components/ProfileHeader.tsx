import type { User } from "@/lib/api";

export default function ProfileHeader({ user }: { user: User }) {
  return (
    <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-8">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={user.username}
            className="h-28 w-28 rounded-xl border border-gray-200 shadow-md"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-primary text-5xl text-white border border-gray-200 shadow-md">
            👤
          </div>
        )}

        <div className="text-center sm:text-left">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-heading text-gray-900">
              {user.username}
            </h1>
            {user.is_bot_verified && (
              <span className="badge-clean bg-primary text-white">
                ✓ Verified
              </span>
            )}
          </div>

          {user.bio && (
            <p className="mt-3 max-w-xl text-base font-normal text-gray-500">
              {user.bio}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {user.location && (
              <span className="badge-clean bg-primary-light text-primary-dark">
                📍 {user.location}
              </span>
            )}
            {user.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="badge-clean bg-primary text-white hover:bg-primary-dark transition-colors"
              >
                🔗 {new URL(user.website).hostname}
              </a>
            )}
            <span className="badge-clean bg-section text-gray-500">
              Joined {new Date(user.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
