import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, contributions } from '@/lib/schema';
import { sql, desc } from 'drizzle-orm';

export async function GET() {
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
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        contributionCount: sql<number>`(SELECT COUNT(*) FROM contributions WHERE contributions.user_id = ${users.id})`,
      })
      .from(users)
      .orderBy(desc(sql`(SELECT COUNT(*) FROM contributions WHERE contributions.user_id = ${users.id})`));

    // Map to match the frontend expected format
    const mapped = result.map((u) => ({
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
      followers: 0,
      following: 0,
      skills: [],
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
