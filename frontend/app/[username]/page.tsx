"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import SkillBar from "@/components/SkillBar";
import ActivityTimeline from "@/components/ActivityTimeline";
import StatsRow from "@/components/StatsRow";
import ContributionCard from "@/components/ContributionCard";
import ProjectCard from "@/components/ProjectCard";

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [starred, setStarred] = useState(false);
  const [mockUser, setMockUser] = useState<any>(null);
  const [contributions, setContributions] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [userRes, contribRes, projectsRes] = await Promise.all([
          fetch(`/api/users/${username}`),
          fetch(`/api/contributions?userId=`), // will filter after we get user
          fetch(`/api/projects`),
        ]);

        if (userRes.ok) {
          const userData = await userRes.json();
          setMockUser(userData);

          // Now fetch contributions for this user
          const userContribRes = await fetch(`/api/contributions?userId=${userData.id}`);
          if (userContribRes.ok) {
            setContributions(await userContribRes.json());
          }

          // Filter projects by owner
          if (projectsRes.ok) {
            const allProjects = await projectsRes.json();
            setProjects(allProjects.filter((p: any) => p.owner.id === userData.id));
          }
        } else {
          // User not found, create placeholder
          setMockUser({
            id: 0,
            username,
            avatar_url: `https://ui-avatars.com/api/?name=${username}&background=2BA24C&color=fff&bold=true&size=128`,
            bio: '',
            location: '',
            website: '',
            github_url: '',
            is_bot_verified: false,
            created_at: new Date().toISOString(),
            followers: 0,
            following: 0,
            skills: [],
            contribution_count: 0,
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [username]);

  if (loading || !mockUser) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-lg text-gray-400">Loading profile...</div>
      </div>
    );
  }

  const pinnedContributions = contributions.filter((c: any) => c.verification_status === "VERIFIED").slice(0, 4);
  const uniqueProjects = new Set(contributions.map((c: any) => c.project)).size;
  const uniqueLangs = new Set(mockUser.skills?.map((s: any) => s.name) || []).size;

  return (
    <div>
      {/* Profile Header */}
      <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <img
            src={mockUser.avatar_url}
            alt={mockUser.username}
            className="h-28 w-28 rounded-xl border border-gray-200 shadow-md"
          />
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
              <h1 className="text-3xl font-heading text-gray-900">
                {mockUser.username}
              </h1>
              {mockUser.is_bot_verified && (
                <span className="badge-clean bg-primary text-white">✓ Verified</span>
              )}
              <button
                onClick={() => setStarred((s) => !s)}
                className={`badge-clean transition-colors cursor-pointer ${
                  starred ? "bg-primary text-white" : "bg-section text-gray-500 hover:bg-primary-light"
                }`}
              >
                {starred ? "⭐ Starred" : "☆ Star"}
              </button>
            </div>

            {mockUser.bio && (
              <p className="mt-3 max-w-xl text-base font-normal text-gray-500">{mockUser.bio}</p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3 justify-center sm:justify-start">
              {mockUser.location && (
                <span className="badge-clean bg-primary-light text-primary-dark">📍 {mockUser.location}</span>
              )}
              {mockUser.website && (
                <a href={mockUser.website} target="_blank" rel="noopener noreferrer" className="badge-clean bg-primary text-white hover:bg-primary-dark transition-colors">
                  🔗 {new URL(mockUser.website).hostname}
                </a>
              )}
              {mockUser.github_url && (
                <a href={mockUser.github_url} target="_blank" rel="noopener noreferrer" className="badge-clean bg-gray-900 text-white hover:bg-gray-700 transition-colors">
                  GitHub
                </a>
              )}
              <span className="badge-clean bg-section text-gray-500">
                Joined {new Date(mockUser.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="mt-3 flex gap-4 justify-center sm:justify-start text-sm">
              <span><strong className="text-gray-900">{mockUser.followers}</strong> <span className="text-gray-400">followers</span></span>
              <span><strong className="text-gray-900">{mockUser.following}</strong> <span className="text-gray-400">following</span></span>
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
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-heading text-gray-900 mb-4">
              📌 Pinned <span className="text-primary">Contributions</span>
            </h2>
            <div className="space-y-3">
              {pinnedContributions.length > 0 ? (
                pinnedContributions.map((c: any) => (
                  <ContributionCard key={c.id} contribution={c} />
                ))
              ) : (
                <div className="card-clean text-center py-8">
                  <p className="font-medium text-gray-400">No pinned contributions yet</p>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-heading text-gray-900 mb-4">
              ⏳ Activity <span className="text-primary">Timeline</span>
            </h2>
            {contributions.length > 0 ? (
              <ActivityTimeline contributions={contributions} />
            ) : (
              <div className="card-clean text-center py-8">
                <p className="font-medium text-gray-400">No activity yet</p>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <div className="card-clean-green">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              💻 Skills
            </h2>
            {mockUser.skills && mockUser.skills.length > 0 ? (
              <SkillBar skills={mockUser.skills} />
            ) : (
              <p className="text-sm font-normal text-gray-400">No skills data</p>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              📦 <span className="text-primary">Projects</span>
            </h2>
            {projects.length > 0 ? (
              <div className="space-y-4">
                {projects.map((p: any) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            ) : (
              <div className="card-clean text-center py-6">
                <p className="font-medium text-gray-400 text-sm">No projects yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
