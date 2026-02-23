import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "username is required" }, { status: 400 });
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { "User-Agent": "OpenCoders" },
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=10`, {
        headers: { "User-Agent": "OpenCoders" },
      }),
    ]);

    if (!userRes.ok) {
      return NextResponse.json({ error: "GitHub user not found" }, { status: 404 });
    }

    const user = await userRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];

    const langSet = new Set<string>();
    repos.forEach((r: any) => { if (r.language) langSet.add(r.language); });
    const languages = Array.from(langSet);

    return NextResponse.json({
      name: user.name,
      bio: user.bio,
      avatar_url: user.avatar_url,
      location: user.location,
      blog: user.blog,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      html_url: user.html_url,
      skills: languages,
    });
  } catch (error) {
    console.error("GitHub fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch GitHub profile" }, { status: 500 });
  }
}
