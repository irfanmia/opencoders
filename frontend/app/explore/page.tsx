"use client";
import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import DeveloperCard from "@/components/DeveloperCard";
import SearchBar from "@/components/SearchBar";
import FilterTabs from "@/components/FilterTabs";
import { mockProjects, mockUsers } from "@/lib/mock-data";

const sortOptions = ["Most Stars", "Most Active", "Newest"];

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("Projects");
  const [sort, setSort] = useState("Most Stars");

  const q = query.toLowerCase();

  const filteredProjects = mockProjects
    .filter((p) => !q || p.name.toLowerCase().includes(q) || p.tech_stack.some((t) => t.toLowerCase().includes(q)) || p.description.toLowerCase().includes(q))
    .sort((a, b) => {
      if (sort === "Most Stars") return (b.star_count || 0) - (a.star_count || 0);
      if (sort === "Newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return (b.star_count || 0) - (a.star_count || 0);
    });

  const filteredDevs = mockUsers
    .filter((u) => !q || u.username.toLowerCase().includes(q) || u.skills.some((s) => s.name.toLowerCase().includes(q)) || u.bio.toLowerCase().includes(q))
    .sort((a, b) => {
      if (sort === "Most Active") return b.contribution_count - a.contribution_count;
      if (sort === "Most Stars") return b.followers - a.followers;
      if (sort === "Newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return 0;
    });

  return (
    <div>
      <div className="mb-10 rounded-xl border border-black/20 bg-brutal-green-light p-8 shadow-brutal-green">
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black">
          🔍 Explore <span className="text-brutal-green">{tab}</span>
        </h1>
        <p className="mt-3 text-lg font-bold text-gray-600">
          Discover open source projects and developers from the community
        </p>
      </div>

      <div className="mb-6">
        <SearchBar value={query} onChange={setQuery} placeholder={`Search ${tab.toLowerCase()}...`} />
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <FilterTabs tabs={["Projects", "Developers"]} active={tab} onChange={setTab} />
        <div className="flex gap-2">
          {sortOptions.map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`rounded-md border border-black/20 px-3 py-1.5 text-[11px] font-extrabold uppercase transition-all ${
                sort === s ? "bg-brutal-green text-white shadow-none" : "bg-white shadow-brutal-sm hover:bg-brutal-green-light"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {tab === "Projects" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full card-brutal text-center py-12">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-black uppercase text-gray-400">No projects found</p>
            </div>
          ) : (
            filteredProjects.map((p) => <ProjectCard key={p.id} project={p} />)
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDevs.length === 0 ? (
            <div className="col-span-full card-brutal text-center py-12">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-black uppercase text-gray-400">No developers found</p>
            </div>
          ) : (
            filteredDevs.map((u, i) => <DeveloperCard key={u.id} user={u} index={i} />)
          )}
        </div>
      )}
    </div>
  );
}
