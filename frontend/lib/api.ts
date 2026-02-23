const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.opencoders.org";

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// Types
export interface User {
  id: number;
  username: string;
  github_id: string;
  bio: string;
  portfolio_slug: string;
  avatar_url: string;
  is_bot_verified: boolean;
  location: string;
  website: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  name: string;
  slug: string;
  is_official: boolean;
  owner_org: string;
  repo_url: string;
  logo: string;
  description: string;
  tech_stack: string[];
  owner: Pick<User, "id" | "username" | "avatar_url" | "portfolio_slug">;
  star_count?: number;
  created_at: string;
}

export interface Contribution {
  id: number;
  user: Pick<User, "id" | "username" | "avatar_url">;
  project: number;
  type: "PR" | "COMMIT" | "ISSUE";
  verification_status: "PENDING" | "VERIFIED" | "REJECTED";
  url: string;
  title: string;
  date: string;
}

export interface Launch {
  id: number;
  project: number;
  project_detail: Project;
  launched_by: Pick<User, "id" | "username" | "avatar_url">;
  launch_date: string;
  upvote_count: number;
  seeking_help: boolean;
  description: string;
  created_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// API methods
export const api = {
  users: {
    list: () => fetchAPI<PaginatedResponse<User>>("/api/users/"),
    get: (username: string) => fetchAPI<User>(`/api/users/${username}/`),
    me: () => fetchAPI<User>("/api/users/me/"),
  },
  projects: {
    list: () => fetchAPI<PaginatedResponse<Project>>("/api/projects/"),
    get: (slug: string) => fetchAPI<Project>(`/api/projects/${slug}/`),
  },
  contributions: {
    list: (userId?: number) =>
      fetchAPI<PaginatedResponse<Contribution>>(
        `/api/contributions/${userId ? `?user=${userId}` : ""}`
      ),
  },
  launches: {
    list: () => fetchAPI<PaginatedResponse<Launch>>("/api/launches/launches/"),
    get: (id: number) => fetchAPI<Launch>(`/api/launches/launches/${id}/`),
  },
};
