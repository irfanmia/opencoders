"use client";
import { useState } from "react";
import Link from "next/link";
import { mockLaunches, timeAgo } from "@/lib/mock-data";
import UpvoteButton from "@/components/UpvoteButton";
import FilterTabs from "@/components/FilterTabs";

const cardAccents = [
  "shadow-brutal-lime",
  "shadow-brutal-pink",
  "shadow-brutal-blue",
  "shadow-brutal-yellow",
];

const filterDays: Record<string, number> = {
  Today: 1,
  "This Week": 7,
  "This Month": 30,
  All: 9999,
};

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = mockLaunches.filter(() => {
    // In real app would filter by date — mock data is static so show all
    return true;
  });

  return (
    <div>
      {/* Hero */}
      <div className="mb-10 rounded-xl border-3 border-black bg-brutal-lime/20 p-8 shadow-brutal-lime">
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black">
          🚀 Launch<span className="text-brutal-pink">pad</span>
        </h1>
        <p className="mt-3 text-lg font-bold text-gray-600">
          Discover and upvote the latest open source projects from the community.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          <FilterTabs
            tabs={Object.keys(filterDays)}
            active={activeFilter}
            onChange={setActiveFilter}
          />

          {filtered.length === 0 ? (
            <div className="card-brutal text-center py-16">
              <p className="text-6xl mb-4">🚀</p>
              <p className="text-xl font-black uppercase text-gray-400">No launches yet!</p>
            </div>
          ) : (
            filtered.map((launch, i) => (
              <div
                key={launch.id}
                className={`rounded-xl border-3 border-black bg-white p-6 ${cardAccents[i % cardAccents.length]} transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-3 border-black bg-brutal-yellow text-2xl shadow-brutal-sm">
                      🚀
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-black uppercase tracking-tight text-black">
                        {launch.project_detail?.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-gray-600 line-clamp-2">
                        {launch.description}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Link href={`/${launch.launched_by.username}`} className="badge-brutal bg-brutal-pink/10 text-brutal-pink hover:bg-brutal-pink/20 transition-colors">
                          <img src={launch.launched_by.avatar_url} alt="" className="h-4 w-4 rounded border border-black mr-1" />
                          {launch.launched_by.username}
                        </Link>
                        <span className="badge-brutal bg-brutal-muted text-gray-500 font-mono">
                          {timeAgo(launch.launch_date)}
                        </span>
                        {launch.seeking_help && (
                          <span className="badge-brutal bg-brutal-orange text-black animate-pulse">
                            🤝 SEEKING HELP
                          </span>
                        )}
                      </div>
                      {launch.project_detail?.tech_stack && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {launch.project_detail.tech_stack.map((t) => (
                            <span key={t} className="rounded border border-black/20 bg-brutal-muted px-2 py-0.5 text-[10px] font-bold text-gray-600">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <UpvoteButton initialCount={launch.upvote_count} />
                </div>
              </div>
            ))
          )}
        </div>

        <aside className="space-y-6">
          <div className="card-brutal-yellow">
            <h3 className="font-black text-lg uppercase text-black">🔥 Trending Tech</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { name: "TypeScript", color: "bg-brutal-blue text-white" },
                { name: "Rust", color: "bg-brutal-orange text-black" },
                { name: "Go", color: "bg-brutal-cyan text-black" },
                { name: "Python", color: "bg-brutal-yellow text-black" },
                { name: "React", color: "bg-brutal-lime text-black" },
                { name: "Svelte", color: "bg-brutal-pink text-white" },
              ].map((tech) => (
                <Link key={tech.name} href={`/explore?q=${tech.name}`} className={`badge-brutal ${tech.color} hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer`}>
                  {tech.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="card-brutal-pink">
            <h3 className="font-black text-lg uppercase text-black">🤝 Seeking Help</h3>
            <div className="mt-3 space-y-2">
              {mockLaunches.filter((l) => l.seeking_help).slice(0, 3).map((l) => (
                <div key={l.id} className="rounded-lg border-2 border-black bg-white p-3 text-sm font-bold">
                  {l.project_detail?.name}
                  <span className="text-xs text-gray-400 ml-2">▲ {l.upvote_count}</span>
                </div>
              ))}
            </div>
            <Link href="/explore" className="btn-brutal-pink mt-5 w-full justify-center">
              Browse Projects →
            </Link>
          </div>

          <div className="card-brutal-blue">
            <h3 className="font-black text-lg uppercase text-black">📊 Stats</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { label: "Devs", value: "2.4K", color: "text-brutal-pink" },
                { label: "Projects", value: "890", color: "text-brutal-blue" },
                { label: "PRs", value: "12K", color: "text-brutal-orange" },
                { label: "Launches", value: "342", color: "text-brutal-lime" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border-2 border-black bg-brutal-muted p-3 text-center shadow-brutal-sm">
                  <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs font-bold uppercase text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
