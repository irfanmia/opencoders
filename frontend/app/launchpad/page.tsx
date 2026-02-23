"use client";
import { useState } from "react";
import Link from "next/link";
import { mockLaunches, timeAgo } from "@/lib/mock-data";
import UpvoteButton from "@/components/UpvoteButton";
import FilterTabs from "@/components/FilterTabs";

const filterDays: Record<string, number> = {
  Today: 1,
  "This Week": 7,
  "This Month": 30,
  "All Time": 9999,
};

export default function LaunchpadPage() {
  const [activeFilter, setActiveFilter] = useState("All Time");

  const filtered = mockLaunches.filter(() => true);

  return (
    <div>
      {/* Hero */}
      <div className="mb-10 rounded-xl border border-black/20 bg-brutal-green-light p-8 shadow-brutal-green">
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black">
          🚀 Launch<span className="text-brutal-green">pad</span>
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
            filtered.map((launch) => (
              <div
                key={launch.id}
                className="rounded-xl border border-black/20 bg-white p-6 shadow-brutal transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-black/20 bg-brutal-green-light text-2xl shadow-brutal-sm">
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
                        <Link href={`/${launch.launched_by.username}`} className="badge-brutal bg-brutal-green-light text-brutal-green-dark hover:bg-brutal-green/10 transition-colors">
                          <img src={launch.launched_by.avatar_url} alt="" className="h-4 w-4 rounded border border-black/10 mr-1" />
                          {launch.launched_by.username}
                        </Link>
                        <span className="badge-brutal bg-brutal-muted text-gray-500 font-mono">
                          {timeAgo(launch.launch_date)}
                        </span>
                        {launch.seeking_help && (
                          <span className="badge-brutal bg-brutal-green-accent text-white animate-pulse">
                            🤝 SEEKING HELP
                          </span>
                        )}
                      </div>
                      {launch.project_detail?.tech_stack && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {launch.project_detail.tech_stack.map((t) => (
                            <span key={t} className="rounded border border-black/10 bg-brutal-muted px-2 py-0.5 text-[10px] font-bold text-gray-600">{t}</span>
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
          <div className="card-brutal-green">
            <h3 className="font-black text-lg uppercase text-black">🔥 Trending Tech</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["TypeScript", "Rust", "Go", "Python", "React", "Svelte"].map((tech) => (
                <Link key={tech} href={`/explore?q=${tech}`} className="badge-brutal bg-white text-brutal-green-dark hover:bg-brutal-green-light hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer">
                  {tech}
                </Link>
              ))}
            </div>
          </div>

          <div className="card-brutal-green">
            <h3 className="font-black text-lg uppercase text-black">🤝 Seeking Help</h3>
            <div className="mt-3 space-y-2">
              {mockLaunches.filter((l) => l.seeking_help).slice(0, 3).map((l) => (
                <div key={l.id} className="rounded-lg border border-black/15 bg-white p-3 text-sm font-bold">
                  {l.project_detail?.name}
                  <span className="text-xs text-gray-400 ml-2">▲ {l.upvote_count}</span>
                </div>
              ))}
            </div>
            <Link href="/explore" className="btn-brutal mt-5 w-full justify-center">
              Browse Projects →
            </Link>
          </div>

          <div className="card-brutal-green">
            <h3 className="font-black text-lg uppercase text-black">📊 Stats</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { label: "Devs", value: "2.4K" },
                { label: "Projects", value: "890" },
                { label: "PRs", value: "12K" },
                { label: "Launches", value: "342" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border border-black/15 bg-white p-3 text-center shadow-brutal-sm">
                  <div className="text-2xl font-black text-brutal-green">{stat.value}</div>
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
