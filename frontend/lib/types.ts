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
  project_name?: string;
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
