"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserProfile {
  id: number;
  username: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  avatarUrl: string | null;
  githubUsername: string | null;
}

interface GithubRepo {
  id: number;
  fullName: string;
  name: string;
  description: string | null;
  htmlUrl: string;
  stars: number;
  language: string | null;
  topics: string[];
  fork: boolean;
}

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [form, setForm] = useState({ name: "", username: "", bio: "", location: "", website: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // GitHub repos
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [showRepos, setShowRepos] = useState(false);
  const [selectedRepos, setSelectedRepos] = useState<Set<string>>(new Set());
  const [importing, setImporting] = useState(false);
  const [importMessage, setImportMessage] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/users/me")
        .then((r) => r.json())
        .then((data) => {
          setProfile(data);
          setForm({
            name: data.name || "",
            username: data.username || "",
            bio: data.bio || "",
            location: data.location || "",
            website: data.website || "",
          });
        });
    }
  }, [status]);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMessage("Profile updated successfully!");
        const data = await res.json();
        setProfile(data);
      } else {
        const err = await res.json();
        setMessage(err.error || "Failed to update profile");
      }
    } catch {
      setMessage("Failed to update profile");
    }
    setSaving(false);
  };

  const loadRepos = async () => {
    setLoadingRepos(true);
    setShowRepos(true);
    try {
      const res = await fetch("/api/github/repos");
      if (res.ok) {
        const data = await res.json();
        setRepos(data);
      }
    } catch {
      console.error("Failed to load repos");
    }
    setLoadingRepos(false);
  };

  const toggleRepo = (fullName: string) => {
    setSelectedRepos((prev) => {
      const next = new Set(prev);
      if (next.has(fullName)) next.delete(fullName);
      else next.add(fullName);
      return next;
    });
  };

  const importSelected = async () => {
    if (selectedRepos.size === 0) return;
    setImporting(true);
    setImportMessage("");
    try {
      const res = await fetch("/api/github/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoIds: Array.from(selectedRepos) }),
      });
      if (res.ok) {
        const data = await res.json();
        setImportMessage(
          `Imported ${data.imported.length} project(s)${data.skipped.length ? `, ${data.skipped.length} already existed` : ""}`
        );
        setSelectedRepos(new Set());
      }
    } catch {
      setImportMessage("Failed to import repos");
    }
    setImporting(false);
  };

  if (status === "loading" || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full px-4 lg:px-0 lg:max-w-[75vw] py-10">
        <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-manrope)]">
          Settings
        </h1>
        <p className="mt-1 text-gray-500">Manage your profile and projects</p>

        {/* Profile Section */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 font-[family-name:var(--font-manrope)]">
            Profile
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Website</label>
              <input
                type="text"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
            </div>
          </div>

          {message && (
            <p className={`mt-4 text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* GitHub Import Section */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 font-[family-name:var(--font-manrope)]">
                GitHub Projects
              </h2>
              <p className="mt-1 text-sm text-gray-500">Import your repositories as projects</p>
            </div>
            {!showRepos && (
              <button
                onClick={loadRepos}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                Import from GitHub
              </button>
            )}
          </div>

          {showRepos && (
            <div className="mt-5">
              {loadingRepos ? (
                <div className="flex items-center justify-center py-8">
                  <div className="h-6 w-6 animate-spin rounded-full border-3 border-primary border-t-transparent" />
                </div>
              ) : repos.length === 0 ? (
                <p className="text-sm text-gray-500 py-4">No repositories found.</p>
              ) : (
                <>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {repos.map((repo) => (
                      <label
                        key={repo.fullName}
                        className="flex items-start gap-3 rounded-lg border border-gray-100 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedRepos.has(repo.fullName)}
                          onChange={() => toggleRepo(repo.fullName)}
                          className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">{repo.name}</span>
                            {repo.fork && (
                              <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">fork</span>
                            )}
                            {repo.language && (
                              <span className="text-xs text-primary bg-green-50 px-1.5 py-0.5 rounded">
                                {repo.language}
                              </span>
                            )}
                            <span className="text-xs text-gray-400">⭐ {repo.stars}</span>
                          </div>
                          {repo.description && (
                            <p className="text-xs text-gray-500 mt-0.5 truncate">{repo.description}</p>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>

                  {importMessage && (
                    <p className="mt-3 text-sm text-green-600">{importMessage}</p>
                  )}

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={importSelected}
                      disabled={importing || selectedRepos.size === 0}
                      className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 transition-colors"
                    >
                      {importing ? "Importing..." : `Import Selected (${selectedRepos.size})`}
                    </button>
                    <button
                      onClick={() => { setShowRepos(false); setRepos([]); setSelectedRepos(new Set()); }}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
