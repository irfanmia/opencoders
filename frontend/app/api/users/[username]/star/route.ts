import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { users, stars } from '@/lib/schema';
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

    // Check existing star
    const existing = await db.select({ id: stars.id }).from(stars)
      .where(and(eq(stars.userId, currentUserId), eq(stars.targetType, 'user'), eq(stars.targetId, targetId)))
      .limit(1);

    let isStarred: boolean;

    if (existing.length > 0) {
      await db.delete(stars).where(eq(stars.id, existing[0].id));
      isStarred = false;
    } else {
      await db.insert(stars).values({ userId: currentUserId, targetType: 'user', targetId });
      isStarred = true;
    }

    // Count stars for this user
    const countResult = await db.select({ count: sql<number>`COUNT(*)` }).from(stars)
      .where(and(eq(stars.targetType, 'user'), eq(stars.targetId, targetId)));

    return NextResponse.json({
      starred: isStarred,
      starCount: Number(countResult[0]?.count ?? 0),
    });
  } catch (error) {
    console.error('Error toggling star:', error);
    return NextResponse.json({ error: 'Failed to toggle star' }, { status: 500 });
  }
}
