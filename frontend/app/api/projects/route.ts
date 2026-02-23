import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects, users } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET() {
  try {
    const result = await db
      .select({
        id: projects.id,
        name: projects.name,
        slug: projects.slug,
        description: projects.description,
        repoUrl: projects.repoUrl,
        logo: projects.logo,
        techStack: projects.techStack,
        starCount: projects.starCount,
        ownerId: projects.ownerId,
        createdAt: projects.createdAt,
        ownerUsername: users.username,
        ownerAvatar: users.avatarUrl,
      })
      .from(projects)
      .leftJoin(users, eq(projects.ownerId, users.id))
      .orderBy(desc(projects.starCount));

    const mapped = result.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      is_official: false,
      owner_org: '',
      repo_url: p.repoUrl,
      logo: p.logo,
      description: p.description,
      tech_stack: p.techStack || [],
      owner: {
        id: p.ownerId,
        username: p.ownerUsername,
        avatar_url: p.ownerAvatar,
        portfolio_slug: p.ownerUsername,
      },
      star_count: p.starCount,
      created_at: p.createdAt?.toISOString(),
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
