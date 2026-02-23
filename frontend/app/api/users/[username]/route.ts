import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq, sql } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const result = await db
      .select({
        id: users.id,
        username: users.username,
        name: users.name,
        avatarUrl: users.avatarUrl,
        bio: users.bio,
        location: users.location,
        website: users.website,
        githubId: users.githubId,
        githubUsername: users.githubUsername,
        title: users.title,
        skills: users.skills,
        skillLevels: users.skillLevels,
        followers: users.followers,
        following: users.following,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        contributionCount: sql<number>`(SELECT COUNT(*) FROM contributions WHERE contributions.user_id = ${users.id})`,
      })
      .from(users)
      .where(eq(users.username, params.username))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const u = result[0];
    return NextResponse.json({
      id: u.id,
      username: u.username,
      name: u.name,
      github_id: u.githubId,
      bio: u.bio,
      portfolio_slug: u.username,
      avatar_url: u.avatarUrl,
      is_bot_verified: true,
      location: u.location,
      website: u.website,
      created_at: u.createdAt?.toISOString(),
      updated_at: u.updatedAt?.toISOString(),
      contribution_count: Number(u.contributionCount),
      github_url: u.githubUsername ? `https://github.com/${u.githubUsername}` : null,
      title: u.title,
      followers: u.followers ?? 0,
      following: u.following ?? 0,
      skills: (u.skills || []).map((name: string, i: number) => ({
        name,
        level: Number(u.skillLevels?.[i] ?? 50),
      })),
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}
