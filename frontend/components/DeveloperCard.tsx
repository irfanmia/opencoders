import Link from "next/link";

interface DeveloperUser {
  username: string;
  avatar_url: string;
  bio: string;
  skills: { name: string; level: number }[];
  contribution_count: number;
  followers: number;
}

export default function DeveloperCard({ user, index }: { user: DeveloperUser; index: number }) {
  return (
    <Link href={`/${user.username}`}>
      <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar_url}
            alt={user.username}
            className="h-14 w-14 rounded-xl border border-gray-200"
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 truncate">{user.username}</h3>
            <p className="text-xs font-normal text-gray-500 truncate">{user.bio}</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {user.skills.slice(0, 3).map((s) => (
            <span key={s.name} className="badge-clean bg-section text-gray-600 border border-gray-200 text-[10px]">{s.name}</span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-xs font-medium text-primary">{user.contribution_count} contributions</span>
          <span className="text-xs font-normal text-gray-400">{user.followers} followers</span>
        </div>
      </div>
    </Link>
  );
}
