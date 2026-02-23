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
      <div className="mb-10 py-8">
        <h1 className="text-4xl sm:text-5xl font-heading text-gray-900">
          🚀 Launch<span className="text-primary">pad</span>
        </h1>
        <p className="mt-3 text-lg font-normal text-gray-500">
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
            <div className="card-clean text-center py-16">
              <p className="text-6xl mb-4">🚀</p>
              <p className="text-xl font-semibold text-gray-400">No launches yet!</p>
            </div>
          ) : (
            filtered.map((launch) => (
              <div
                key={launch.id}
                className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-light border border-green-100 text-2xl">
                      🚀
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {launch.project_detail?.name}
                      </h3>
                      <p className="mt-1 text-sm font-normal text-gray-500 line-clamp-2">
                        {launch.description}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Link href={`/${launch.launched_by.username}`} className="badge-clean bg-primary-light text-primary-dark hover:bg-green-100 transition-colors">
                          <img src={launch.launched_by.avatar_url} alt="" className="h-4 w-4 rounded-full border border-gray-200 mr-1" />
                          {launch.launched_by.username}
                        </Link>
                        <span className="badge-clean bg-section text-gray-500">
                          {timeAgo(launch.launch_date)}
                        </span>
                        {launch.seeking_help && (
                          <span className="badge-clean bg-primary text-white animate-pulse">
                            🤝 Seeking Help
                          </span>
                        )}
                      </div>
                      {launch.project_detail?.tech_stack && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {launch.project_detail.tech_stack.map((t) => (
                            <span key={t} className="rounded-full border border-gray-200 bg-section px-2 py-0.5 text-[10px] font-medium text-gray-600">{t}</span>
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
          <div className="card-clean-green">
            <h3 className="font-semibold text-lg text-gray-900">🔥 Trending Tech</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["TypeScript", "Rust", "Go", "Python", "React", "Svelte"].map((tech) => (
                <Link key={tech} href={`/explore?q=${tech}`} className="badge-clean bg-white text-gray-700 border border-gray-200 hover:bg-primary-light hover:text-primary transition-colors cursor-pointer">
                  {tech}
                </Link>
              ))}
            </div>
          </div>

          <div className="card-clean-green">
            <h3 className="font-semibold text-lg text-gray-900">🤝 Seeking Help</h3>
            <div className="mt-3 space-y-2">
              {mockLaunches.filter((l) => l.seeking_help).slice(0, 3).map((l) => (
                <div key={l.id} className="rounded-lg border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700">
                  {l.project_detail?.name}
                  <span className="text-xs text-gray-400 ml-2">▲ {l.upvote_count}</span>
                </div>
              ))}
            </div>
            <Link href="/explore" className="btn-primary mt-5 w-full justify-center">
              Browse Projects →
            </Link>
          </div>

          <div className="card-clean-green">
            <h3 className="font-semibold text-lg text-gray-900">📊 Stats</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { label: "Devs", value: "2.4K" },
                { label: "Projects", value: "890" },
                { label: "PRs", value: "12K" },
                { label: "Launches", value: "342" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border border-gray-200 bg-white p-3 text-center">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs font-medium text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
