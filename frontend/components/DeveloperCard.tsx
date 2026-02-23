import Link from "next/link";
import type { MockUser } from "@/lib/mock-data";

const accents = ["shadow-brutal-lime", "shadow-brutal-pink", "shadow-brutal-blue", "shadow-brutal-yellow"];

export default function DeveloperCard({ user, index }: { user: MockUser; index: number }) {
  return (
    <Link href={`/${user.username}`}>
      <div className={`rounded-xl border-3 border-black bg-white p-5 ${accents[index % accents.length]} transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none`}>
        <div className="flex items-center gap-4">
          <img
            src={user.avatar_url}
            alt={user.username}
            className="h-14 w-14 rounded-xl border-3 border-black"
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-black text-black uppercase tracking-tight truncate">{user.username}</h3>
            <p className="text-xs font-semibold text-gray-500 truncate">{user.bio}</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {user.skills.slice(0, 3).map((s) => (
            <span key={s.name} className="badge-brutal bg-brutal-muted text-black text-[10px]">{s.name}</span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t-2 border-black/10 pt-3">
          <span className="text-xs font-extrabold text-brutal-pink">{user.contribution_count} contributions</span>
          <span className="text-xs font-bold text-gray-400">{user.followers} followers</span>
        </div>
      </div>
    </Link>
  );
}
