"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { getUserByUsername, getContributionsByUser, getProjectsByUser, mockUsers } from "@/lib/mock-data";
import ProfileHeader from "@/components/ProfileHeader";
import SkillBar from "@/components/SkillBar";
import ActivityTimeline from "@/components/ActivityTimeline";
import StatsRow from "@/components/StatsRow";
import ContributionCard from "@/components/ContributionCard";
import ProjectCard from "@/components/ProjectCard";

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [starred, setStarred] = useState(false);

  const mockUser = getUserByUsername(username) || {
    ...mockUsers[0],
    username,
    avatar_url: `https://ui-avatars.com/api/?name=${username}&background=a3e635&color=000&bold=true&size=128`,
  };

  const contributions = getContributionsByUser(mockUser.id);
  const projects = getProjectsByUser(mockUser.id);
  const pinnedContributions = contributions.filter((c) => c.verification_status === "VERIFIED").slice(0, 4);
  const uniqueProjects = new Set(contributions.map((c) => c.project)).size;
  const uniqueLangs = new Set(mockUser.skills?.map((s) => s.name) || []).size;

  return (
    <div>
      {/* Profile Header */}
      <div className="card-brutal-pink">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <img
            src={mockUser.avatar_url}
            alt={mockUser.username}
            className="h-28 w-28 rounded-xl border-3 border-black shadow-brutal"
          />
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
              <h1 className="text-3xl font-black uppercase tracking-tight text-black">
                {mockUser.username}
              </h1>
              {mockUser.is_bot_verified && (
                <span className="badge-brutal bg-brutal-lime text-black">✓ VERIFIED</span>
              )}
              <button
                onClick={() => setStarred((s) => !s)}
                className={`badge-brutal transition-all cursor-pointer ${
                  starred ? "bg-brutal-yellow text-black" : "bg-white text-gray-500 hover:bg-brutal-yellow/30"
                }`}
              >
                {starred ? "⭐ Starred" : "☆ Star"}
              </button>
            </div>

            {mockUser.bio && (
              <p className="mt-3 max-w-xl text-base font-semibold text-gray-600">{mockUser.bio}</p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3 justify-center sm:justify-start">
              {mockUser.location && (
                <span className="badge-brutal bg-brutal-cyan text-black">📍 {mockUser.location}</span>
              )}
              {mockUser.website && (
                <a href={mockUser.website} target="_blank" rel="noopener noreferrer" className="badge-brutal bg-brutal-blue text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all">
                  🔗 {new URL(mockUser.website).hostname}
                </a>
              )}
              {mockUser.github_url && (
                <a href={mockUser.github_url} target="_blank" rel="noopener noreferrer" className="badge-brutal bg-black text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all">
                  GitHub
                </a>
              )}
              <span className="badge-brutal bg-brutal-muted text-gray-600">
                Joined {new Date(mockUser.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="mt-3 flex gap-4 justify-center sm:justify-start text-sm font-bold">
              <span><strong className="text-black">{mockUser.followers}</strong> <span className="text-gray-400">followers</span></span>
              <span><strong className="text-black">{mockUser.following}</strong> <span className="text-gray-400">following</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mt-8">
        <StatsRow stats={[
          { label: "Contributions", value: mockUser.contribution_count || contributions.length },
          { label: "Projects", value: uniqueProjects },
          { label: "Languages", value: uniqueLangs },
          { label: "Followers", value: mockUser.followers },
        ]} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Pinned Contributions */}
          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4">
              📌 Pinned <span className="text-brutal-blue">Contributions</span>
            </h2>
            <div className="space-y-3">
              {pinnedContributions.length > 0 ? (
                pinnedContributions.map((c) => (
                  <ContributionCard key={c.id} contribution={c} />
                ))
              ) : (
                <div className="card-brutal text-center py-8">
                  <p className="font-black uppercase text-gray-400">No pinned contributions yet</p>
                </div>
              )}
            </div>
          </section>

          {/* Activity Timeline */}
          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-4">
              ⏳ Activity <span className="text-brutal-pink">Timeline</span>
            </h2>
            {contributions.length > 0 ? (
              <ActivityTimeline contributions={contributions} />
            ) : (
              <div className="card-brutal text-center py-8">
                <p className="font-black uppercase text-gray-400">No activity yet</p>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Skills */}
          <div className="card-brutal-yellow">
            <h2 className="text-lg font-black uppercase tracking-tight text-black mb-4">
              💻 Skills
            </h2>
            {mockUser.skills && mockUser.skills.length > 0 ? (
              <SkillBar skills={mockUser.skills} />
            ) : (
              <p className="text-sm font-semibold text-gray-400">No skills data</p>
            )}
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight text-black mb-4">
              📦 <span className="text-brutal-pink">Projects</span>
            </h2>
            {projects.length > 0 ? (
              <div className="space-y-4">
                {projects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            ) : (
              <div className="card-brutal text-center py-6">
                <p className="font-black uppercase text-gray-400 text-sm">No projects yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
