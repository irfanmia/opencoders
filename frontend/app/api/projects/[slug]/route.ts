import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects, users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
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
      .where(eq(projects.slug, params.slug))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const p = result[0];
    return NextResponse.json({
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
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}
