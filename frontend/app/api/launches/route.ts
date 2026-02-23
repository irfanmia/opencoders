import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { launches, projects, users } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET() {
  try {
    const result = await db
      .select({
        id: launches.id,
        projectId: launches.projectId,
        launchedById: launches.launchedById,
        tagline: launches.tagline,
        description: launches.description,
        upvoteCount: launches.upvoteCount,
        isFeatured: launches.isFeatured,
        launchedAt: launches.launchedAt,
        createdAt: launches.createdAt,
        projectName: projects.name,
        projectSlug: projects.slug,
        projectDescription: projects.description,
        projectLogo: projects.logo,
        projectRepoUrl: projects.repoUrl,
        projectTechStack: projects.techStack,
        projectStarCount: projects.starCount,
        projectOwnerId: projects.ownerId,
        projectCreatedAt: projects.createdAt,
        launcherUsername: users.username,
        launcherAvatar: users.avatarUrl,
      })
      .from(launches)
      .leftJoin(projects, eq(launches.projectId, projects.id))
      .leftJoin(users, eq(launches.launchedById, users.id))
      .orderBy(desc(launches.upvoteCount));

    const mapped = result.map((l) => ({
      id: l.id,
      project: l.projectId,
      project_detail: {
        id: l.projectId,
        name: l.projectName,
        slug: l.projectSlug,
        is_official: false,
        owner_org: '',
        repo_url: l.projectRepoUrl,
        logo: l.projectLogo,
        description: l.projectDescription,
        tech_stack: l.projectTechStack || [],
        owner: { id: l.projectOwnerId, username: l.launcherUsername, avatar_url: l.launcherAvatar, portfolio_slug: l.launcherUsername },
        star_count: l.projectStarCount,
        created_at: l.projectCreatedAt?.toISOString(),
      },
      launched_by: { id: l.launchedById, username: l.launcherUsername, avatar_url: l.launcherAvatar },
      launch_date: l.launchedAt?.toISOString(),
      upvote_count: l.upvoteCount,
      seeking_help: false,
      description: l.description,
      created_at: l.createdAt?.toISOString(),
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error('Error fetching launches:', error);
    return NextResponse.json({ error: 'Failed to fetch launches' }, { status: 500 });
  }
}
