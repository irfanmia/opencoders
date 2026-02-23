"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SkillBar from "@/components/SkillBar";
import ActivityTimeline from "@/components/ActivityTimeline";
import StatsRow from "@/components/StatsRow";
import ContributionCard from "@/components/ContributionCard";
import ProjectCard from "@/components/ProjectCard";

interface Skill {
  name: string;
  level: number;
}

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;
  const { data: session } = useSession();
  const [starred, setStarred] = useState(false);
  const [starCount, setStarCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [mockUser, setMockUser] = useState<any>(null);
  const [contributions, setContributions] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit mode state
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    title: "",
    bio: "",
    location: "",
    website: "",
    githubUsername: "",
    avatarUrl: "",
    followers: 0,
    following: 0,
  });
  const [editSkills, setEditSkills] = useState<Skill[]>([]);
  const [saving, setSaving] = useState(false);
  const [fetchingGithub, setFetchingGithub] = useState(false);

  // GitHub repos import
  const [showRepoImport, setShowRepoImport] = useState(false);
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [importingRepo, setImportingRepo] = useState<string | null>(null);

  const isOwner = session?.user?.username === username;

  useEffect(() => {
    async function load() {
      try {
        const [userRes, projectsRes] = await Promise.all([
          fetch(`/api/users/${username}`),
          fetch(`/api/projects`),
        ]);

        if (userRes.ok) {
          const userData = await userRes.json();
          setMockUser(userData);
          setStarred(userData.isStarred ?? false);
          setStarCount(userData.starCount ?? 0);
          setIsFollowing(userData.isFollowing ?? false);
          setFollowerCount(userData.followers ?? 0);
          setFollowingCount(userData.following ?? 0);

          const userContribRes = await fetch(`/api/contributions?userId=${userData.id}`);
          if (userContribRes.ok) {
            setContributions(await userContribRes.json());
          }

          if (projectsRes.ok) {
            const allProjects = await projectsRes.json();
            setProjects(allProjects.filter((p: any) => p.owner?.id === userData.id));
          }
        } else {
          setMockUser({
            id: 0,
            username,
            avatar_url: `https://ui-avatars.com/api/?name=${username}&background=2BA24C&color=fff&bold=true&size=128`,
            bio: "",
            location: "",
            website: "",
            github_url: "",
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

  function startEditing() {
    if (!mockUser) return;
    setEditForm({
      name: mockUser.name || "",
      title: mockUser.title || "",
      bio: mockUser.bio || "",
      location: mockUser.location || "",
      website: mockUser.website || "",
      githubUsername: mockUser.github_url ? mockUser.github_url.replace("https://github.com/", "") : "",
      avatarUrl: mockUser.avatar_url || "",
      followers: mockUser.followers || 0,
      following: mockUser.following || 0,
    });
    setEditSkills(
      mockUser.skills && mockUser.skills.length > 0
        ? mockUser.skills.map((s: any) => ({ name: s.name, level: s.level }))
        : []
    );
    setEditing(true);
  }

  function cancelEditing() {
    setEditing(false);
    setShowRepoImport(false);
  }

  async function fetchGithubProfile() {
    if (!editForm.githubUsername.trim()) return;
    setFetchingGithub(true);
    try {
      const res = await fetch(`/api/github/profile?username=${encodeURIComponent(editForm.githubUsername.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setEditForm((prev) => ({
          ...prev,
          name: data.name || prev.name,
          bio: data.bio || prev.bio,
          location: data.location || prev.location,
          website: data.blog || prev.website,
          avatarUrl: data.avatar_url || prev.avatarUrl,
          followers: data.followers ?? prev.followers,
          following: data.following ?? prev.following,
        }));
        if (data.skills && data.skills.length > 0) {
          const newSkills: Skill[] = data.skills.map((lang: string) => ({
            name: lang,
            level: 70,
          }));
          setEditSkills(newSkills);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFetchingGithub(false);
    }
  }

  async function saveProfile() {
    setSaving(true);
    try {
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editForm.name,
          title: editForm.title,
          bio: editForm.bio,
          location: editForm.location,
          website: editForm.website,
          githubUsername: editForm.githubUsername,
          avatarUrl: editForm.avatarUrl,
          followers: editForm.followers,
          following: editForm.following,
          skills: editSkills.map((s) => s.name),
          skillLevels: editSkills.map((s) => String(s.level)),
        }),
      });
      if (res.ok) {
        // Refresh page data
        const userRes = await fetch(`/api/users/${username}`);
        if (userRes.ok) {
          setMockUser(await userRes.json());
        }
        setEditing(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  async function loadGithubRepos() {
    setLoadingRepos(true);
    setShowRepoImport(true);
    try {
      const res = await fetch("/api/github/repos");
      if (res.ok) {
        setGithubRepos(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingRepos(false);
    }
  }

  async function importRepo(repo: any) {
    setImportingRepo(repo.full_name);
    try {
      const res = await fetch("/api/github/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoFullName: repo.full_name }),
      });
      if (res.ok) {
        const projectsRes = await fetch("/api/projects");
        if (projectsRes.ok) {
          const allProjects = await projectsRes.json();
          setProjects(allProjects.filter((p: any) => p.owner?.id === mockUser?.id));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setImportingRepo(null);
    }
  }

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

  const inputClass = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#2BA24C] focus:ring-1 focus:ring-[#2BA24C] outline-none transition-colors";
  const editBgClass = "bg-green-50/50";

  return (
    <div>
      {/* Sticky Save/Cancel bar in edit mode */}
      {editing && (
        <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm -mx-4 mb-6 rounded-b-lg">
          <span className="text-sm font-medium text-gray-600">✏️ Editing Profile</span>
          <div className="flex gap-3">
            <button
              onClick={cancelEditing}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ✕ Cancel
            </button>
            <button
              onClick={saveProfile}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-[#2BA24C] rounded-lg hover:bg-[#239440] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "💾 Save"}
            </button>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className={`rounded-xl bg-white shadow-sm border border-gray-100 p-8 relative ${editing ? editBgClass : ""}`}>
        {isOwner && !editing && (
          <button
            onClick={startEditing}
            className="absolute top-4 right-4 px-3 py-1.5 text-sm font-medium text-white bg-[#2BA24C] rounded-lg hover:bg-[#239440] transition-colors shadow-sm"
          >
            ✏️ Edit Profile
          </button>
        )}

        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="relative">
            <img
              src={editing ? editForm.avatarUrl || mockUser.avatar_url : mockUser.avatar_url}
              alt={mockUser.username}
              className="h-28 w-28 rounded-xl border border-gray-200 shadow-md"
            />
            {editing && (
              <p className="text-xs text-gray-400 mt-1 text-center">Avatar synced from GitHub</p>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left w-full">
            {editing ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Name</label>
                  <input
                    className={inputClass}
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Title / Headline</label>
                  <input
                    className={inputClass}
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="e.g. Full Stack Developer"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Bio</label>
                  <textarea
                    className={inputClass + " resize-none"}
                    rows={3}
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    placeholder="Tell us about yourself"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Location</label>
                    <input
                      className={inputClass}
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Website</label>
                    <input
                      className={inputClass}
                      value={editForm.website}
                      onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                      placeholder="https://yoursite.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">GitHub Username</label>
                  <div className="flex gap-2">
                    <input
                      className={inputClass}
                      value={editForm.githubUsername}
                      onChange={(e) => setEditForm({ ...editForm, githubUsername: e.target.value })}
                      placeholder="github-username"
                    />
                    <button
                      onClick={fetchGithubProfile}
                      disabled={fetchingGithub}
                      className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap disabled:opacity-50"
                    >
                      {fetchingGithub ? "Fetching..." : "🔄 Fetch"}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Enter GitHub username and click Fetch to auto-fill profile data</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
                  <h1 className="text-3xl font-heading text-gray-900">
                    {mockUser.name || mockUser.username}
                  </h1>
                  {mockUser.is_bot_verified && (
                    <span className="badge-clean bg-primary text-white">✓ Verified</span>
                  )}
                  <button
                    onClick={async () => {
                      if (!session) { router.push('/login'); return; }
                      try {
                        const res = await fetch(`/api/users/${username}/star`, { method: 'POST' });
                        if (res.ok) {
                          const data = await res.json();
                          setStarred(data.starred);
                          setStarCount(data.starCount);
                        }
                      } catch (e) { console.error(e); }
                    }}
                    className={`badge-clean transition-colors cursor-pointer ${
                      starred ? "bg-primary text-white" : "bg-section text-gray-500 hover:bg-primary-light"
                    }`}
                  >
                    {starred ? "⭐" : "☆"} {starCount > 0 ? starCount : "Star"}
                  </button>
                  {!isOwner && (
                    <button
                      onClick={async () => {
                        if (!session) { router.push('/login'); return; }
                        try {
                          const res = await fetch(`/api/users/${username}/follow`, { method: 'POST' });
                          if (res.ok) {
                            const data = await res.json();
                            setIsFollowing(data.following);
                            setFollowerCount(data.followerCount);
                          }
                        } catch (e) { console.error(e); }
                      }}
                      className={`badge-clean transition-colors cursor-pointer ${
                        isFollowing ? "bg-[#2BA24C] text-white" : "bg-section text-gray-500 hover:bg-primary-light"
                      }`}
                    >
                      {isFollowing ? "✓ Following" : "Follow"}
                    </button>
                  )}
                </div>

                {mockUser.title && (
                  <p className="mt-1 text-sm font-medium text-[#2BA24C]">{mockUser.title}</p>
                )}

                {mockUser.bio && (
                  <p className="mt-3 max-w-xl text-base font-normal text-gray-500">{mockUser.bio}</p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-3 justify-center sm:justify-start">
                  {mockUser.location && (
                    <span className="badge-clean bg-primary-light text-primary-dark">📍 {mockUser.location}</span>
                  )}
                  {mockUser.website && (
                    <a href={mockUser.website} target="_blank" rel="noopener noreferrer" className="badge-clean bg-primary text-white hover:bg-primary-dark transition-colors">
                      🔗 {(() => { try { return new URL(mockUser.website).hostname; } catch { return mockUser.website; } })()}
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
                  <span><strong className="text-gray-900">{followerCount}</strong> <span className="text-gray-400">followers</span></span>
                  <span><strong className="text-gray-900">{followingCount}</strong> <span className="text-gray-400">following</span></span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mt-8">
        <StatsRow stats={[
          { label: "Contributions", value: mockUser.contribution_count || contributions.length },
          { label: "Projects", value: uniqueProjects },
          { label: "Languages", value: uniqueLangs },
          { label: "Followers", value: followerCount },
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
          {/* Skills Section */}
          <div className={`card-clean-green ${editing ? editBgClass : ""}`}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              💻 Skills
            </h2>
            {editing ? (
              <div className="space-y-3">
                {editSkills.map((skill, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <input
                        className="flex-1 rounded-lg border border-gray-200 px-2 py-1 text-sm focus:border-[#2BA24C] focus:ring-1 focus:ring-[#2BA24C] outline-none"
                        value={skill.name}
                        onChange={(e) => {
                          const updated = [...editSkills];
                          updated[i] = { ...updated[i], name: e.target.value };
                          setEditSkills(updated);
                        }}
                        placeholder="Skill name"
                      />
                      <span className="text-xs text-gray-400 w-8 text-right">{skill.level}%</span>
                      <button
                        onClick={() => setEditSkills(editSkills.filter((_, j) => j !== i))}
                        className="text-red-400 hover:text-red-600 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={skill.level}
                      onChange={(e) => {
                        const updated = [...editSkills];
                        updated[i] = { ...updated[i], level: Number(e.target.value) };
                        setEditSkills(updated);
                      }}
                      className="w-full h-2 rounded-full appearance-none bg-gray-200 accent-[#2BA24C]"
                    />
                  </div>
                ))}
                <button
                  onClick={() => setEditSkills([...editSkills, { name: "", level: 50 }])}
                  className="text-sm text-[#2BA24C] font-medium hover:underline"
                >
                  + Add Skill
                </button>
              </div>
            ) : mockUser.skills && mockUser.skills.length > 0 ? (
              <SkillBar skills={mockUser.skills} />
            ) : (
              <p className="text-sm font-normal text-gray-400">No skills data</p>
            )}
          </div>

          {/* Projects Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                📦 <span className="text-primary">Projects</span>
              </h2>
              {editing && (
                <button
                  onClick={loadGithubRepos}
                  className="text-sm text-[#2BA24C] font-medium hover:underline"
                >
                  Import from GitHub
                </button>
              )}
            </div>

            {/* Repo import picker */}
            {editing && showRepoImport && (
              <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 max-h-60 overflow-y-auto">
                {loadingRepos ? (
                  <p className="text-sm text-gray-400">Loading repos...</p>
                ) : githubRepos.length > 0 ? (
                  <div className="space-y-2">
                    {githubRepos.map((repo: any) => (
                      <div key={repo.full_name} className="flex items-center justify-between py-1">
                        <div>
                          <p className="text-sm font-medium text-gray-700">{repo.name}</p>
                          <p className="text-xs text-gray-400">{repo.description?.slice(0, 60)}</p>
                        </div>
                        <button
                          onClick={() => importRepo(repo)}
                          disabled={importingRepo === repo.full_name}
                          className="text-xs px-3 py-1 bg-[#2BA24C] text-white rounded-lg hover:bg-[#239440] disabled:opacity-50"
                        >
                          {importingRepo === repo.full_name ? "..." : "Import"}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No repos found. Make sure you&apos;re logged in with GitHub.</p>
                )}
              </div>
            )}

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
