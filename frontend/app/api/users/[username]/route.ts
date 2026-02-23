import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { users, stars, follows } from '@/lib/schema';
import { eq, and, sql } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const session = await auth();

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
        starCount: sql<number>`(SELECT COUNT(*) FROM stars WHERE stars.target_type = 'user' AND stars.target_id = ${users.id})`,
      })
      .from(users)
      .where(eq(users.username, params.username))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const u = result[0];

    let isFollowing = false;
    let isStarred = false;

    if (session?.user?.id) {
      const currentUserId = Number(session.user.id);
      const [followCheck, starCheck] = await Promise.all([
        db.select({ id: follows.id }).from(follows)
          .where(and(eq(follows.followerId, currentUserId), eq(follows.followingId, u.id)))
          .limit(1),
        db.select({ id: stars.id }).from(stars)
          .where(and(eq(stars.userId, currentUserId), eq(stars.targetType, 'user'), eq(stars.targetId, u.id)))
          .limit(1),
      ]);
      isFollowing = followCheck.length > 0;
      isStarred = starCheck.length > 0;
    }

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
      starCount: Number(u.starCount),
      isFollowing,
      isStarred,
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
