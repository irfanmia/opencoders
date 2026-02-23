import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.githubUsername) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.mercy-preview+json",
  };

  // Use access token if available for higher rate limits
  if (session.user.accessToken) {
    headers.Authorization = `Bearer ${session.user.accessToken}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${session.user.githubUsername}/repos?sort=updated&per_page=30`,
      { headers, next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch repos" }, { status: res.status });
    }

    const repos = await res.json();
    const mapped = repos.map((r: any) => ({
      id: r.id,
      fullName: r.full_name,
      name: r.name,
      description: r.description,
      htmlUrl: r.html_url,
      stars: r.stargazers_count,
      language: r.language,
      topics: r.topics || [],
      updatedAt: r.updated_at,
      fork: r.fork,
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return NextResponse.json({ error: "Failed to fetch repos" }, { status: 500 });
  }
}
