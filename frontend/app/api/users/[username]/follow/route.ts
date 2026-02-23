import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { users, follows } from '@/lib/schema';
import { eq, and, sql } from 'drizzle-orm';

export async function POST(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUserId = Number(session.user.id);

    // Find target user
    const target = await db.select({ id: users.id }).from(users).where(eq(users.username, params.username)).limit(1);
    if (target.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const targetId = target[0].id;

    if (targetId === currentUserId) {
      return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 });
    }

    // Check existing follow
    const existing = await db.select({ id: follows.id }).from(follows)
      .where(and(eq(follows.followerId, currentUserId), eq(follows.followingId, targetId)))
      .limit(1);

    let isFollowing: boolean;

    if (existing.length > 0) {
      // Unfollow
      await db.delete(follows).where(eq(follows.id, existing[0].id));
      await db.update(users).set({ followers: sql`GREATEST(${users.followers} - 1, 0)` }).where(eq(users.id, targetId));
      await db.update(users).set({ following: sql`GREATEST(${users.following} - 1, 0)` }).where(eq(users.id, currentUserId));
      isFollowing = false;
    } else {
      // Follow
      await db.insert(follows).values({ followerId: currentUserId, followingId: targetId });
      await db.update(users).set({ followers: sql`${users.followers} + 1` }).where(eq(users.id, targetId));
      await db.update(users).set({ following: sql`${users.following} + 1` }).where(eq(users.id, currentUserId));
      isFollowing = true;
    }

    // Get updated count
    const updated = await db.select({ followers: users.followers }).from(users).where(eq(users.id, targetId)).limit(1);

    return NextResponse.json({
      following: isFollowing,
      followerCount: updated[0]?.followers ?? 0,
    });
  } catch (error) {
    console.error('Error toggling follow:', error);
    return NextResponse.json({ error: 'Failed to toggle follow' }, { status: 500 });
  }
}
