import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects } from "@/lib/schema";
import { eq } from "drizzle-orm";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { repoIds } = await request.json();
  if (!Array.isArray(repoIds) || repoIds.length === 0) {
    return NextResponse.json({ error: "No repos specified" }, { status: 400 });
  }

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.mercy-preview+json",
  };
  if (session.user.accessToken) {
    headers.Authorization = `Bearer ${session.user.accessToken}`;
  }

  const imported: string[] = [];
  const skipped: string[] = [];

  for (const fullName of repoIds) {
    try {
      const repoUrl = `https://github.com/${fullName}`;

      // Check if already imported
      const existing = await db
        .select({ id: projects.id })
        .from(projects)
        .where(eq(projects.repoUrl, repoUrl))
        .limit(1);

      if (existing.length > 0) {
        skipped.push(fullName);
        continue;
      }

      // Fetch repo details
      const res = await fetch(`https://api.github.com/repos/${fullName}`, { headers });
      if (!res.ok) continue;
      const repo = await res.json();

      const techStack: string[] = [];
      if (repo.language) techStack.push(repo.language);
      if (repo.topics) techStack.push(...repo.topics);

      const slug = slugify(`${repo.name}-${Date.now().toString(36)}`);

      await db.insert(projects).values({
        name: repo.name,
        slug,
        description: repo.description || null,
        repoUrl,
        websiteUrl: repo.homepage || null,
        logo: repo.owner?.avatar_url || null,
        techStack: techStack.length > 0 ? techStack : null,
        ownerId: Number(session.user.id),
        platform: "github",
        starCount: repo.stargazers_count || 0,
        isLookingForContributors: false,
      });

      imported.push(fullName);
    } catch (error) {
      console.error(`Error importing ${fullName}:`, error);
    }
  }

  return NextResponse.json({ imported, skipped });
}
