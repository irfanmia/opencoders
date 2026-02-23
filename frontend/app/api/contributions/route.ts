import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contributions, users, projects } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

const typeMap: Record<string, string> = {
  pull_request: 'PR',
  commit: 'COMMIT',
  issue: 'ISSUE',
  review: 'PR',
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let query = db
      .select({
        id: contributions.id,
        userId: contributions.userId,
        projectId: contributions.projectId,
        title: contributions.title,
        url: contributions.url,
        type: contributions.type,
        createdAt: contributions.createdAt,
        username: users.username,
        avatarUrl: users.avatarUrl,
        projectName: projects.name,
      })
      .from(contributions)
      .leftJoin(users, eq(contributions.userId, users.id))
      .leftJoin(projects, eq(contributions.projectId, projects.id))
      .orderBy(desc(contributions.createdAt))
      .$dynamic();

    if (userId) {
      query = query.where(eq(contributions.userId, parseInt(userId)));
    }

    const result = await query;

    const mapped = result.map((c) => ({
      id: c.id,
      user: { id: c.userId, username: c.username, avatar_url: c.avatarUrl },
      project: c.projectId,
      project_name: c.projectName || undefined,
      type: typeMap[c.type] || 'COMMIT',
      verification_status: 'VERIFIED',
      url: c.url,
      title: c.title,
      date: c.createdAt?.toISOString(),
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: 500 });
  }
}
