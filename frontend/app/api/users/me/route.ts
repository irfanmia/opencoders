import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, Number(session.user.id)))
    .limit(1);

  if (result.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(result[0]);
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const allowedFields = ["name", "bio", "location", "website", "username", "githubUsername", "title", "skills", "skillLevels", "followers", "following", "avatarUrl"];
  const updates: Record<string, any> = { updatedAt: new Date() };

  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      updates[field] = body[field];
    }
  }

  // If username is being changed, check uniqueness
  if (updates.username) {
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, updates.username))
      .limit(1);
    if (existing.length > 0 && existing[0].id !== Number(session.user.id)) {
      return NextResponse.json({ error: "Username already taken" }, { status: 409 });
    }
  }

  const result = await db
    .update(users)
    .set(updates)
    .where(eq(users.id, Number(session.user.id)))
    .returning();

  return NextResponse.json(result[0]);
}
