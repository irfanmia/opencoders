import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../lib/schema';
import { mockUsers, mockProjects, mockContributions, mockLaunches } from '../lib/mock-data';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log('🌱 Seeding database...');

  // Clear existing data in reverse dependency order
  await db.delete(schema.upvotes);
  await db.delete(schema.stars);
  await db.delete(schema.launches);
  await db.delete(schema.contributions);
  await db.delete(schema.projects);
  await db.delete(schema.users);
  console.log('  Cleared existing data');

  // Insert users
  const insertedUsers = await db.insert(schema.users).values(
    mockUsers.map((u) => ({
      id: u.id,
      username: u.username,
      name: u.username,
      avatarUrl: u.avatar_url,
      bio: u.bio,
      location: u.location,
      website: u.website,
      githubId: u.github_id,
      githubUsername: u.username,
      email: `${u.username}@example.com`,
      createdAt: new Date(u.created_at),
      updatedAt: new Date(u.updated_at),
    }))
  ).returning();
  console.log(`  Inserted ${insertedUsers.length} users`);

  // Insert projects
  const insertedProjects = await db.insert(schema.projects).values(
    mockProjects.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      repoUrl: p.repo_url,
      logo: p.logo,
      techStack: p.tech_stack,
      ownerId: p.owner.id,
      platform: 'github' as const,
      starCount: p.star_count || 0,
      isLookingForContributors: false,
      createdAt: new Date(p.created_at),
      updatedAt: new Date(p.created_at),
    }))
  ).returning();
  console.log(`  Inserted ${insertedProjects.length} projects`);

  // Insert contributions
  const typeMap: Record<string, 'pull_request' | 'commit' | 'issue' | 'review'> = {
    PR: 'pull_request',
    COMMIT: 'commit',
    ISSUE: 'issue',
  };

  const insertedContributions = await db.insert(schema.contributions).values(
    mockContributions.map((c) => ({
      id: c.id,
      userId: c.user.id,
      projectId: c.project,
      title: c.title,
      description: c.title,
      url: c.url,
      type: typeMap[c.type] || 'commit',
      platform: 'github',
      createdAt: new Date(c.date),
    }))
  ).returning();
  console.log(`  Inserted ${insertedContributions.length} contributions`);

  // Insert launches
  const insertedLaunches = await db.insert(schema.launches).values(
    mockLaunches.map((l) => ({
      id: l.id,
      projectId: l.project,
      launchedById: l.launched_by.id,
      tagline: l.project_detail?.name || '',
      description: l.description,
      upvoteCount: l.upvote_count,
      isFeatured: false,
      launchedAt: new Date(l.launch_date),
      createdAt: new Date(l.created_at),
    }))
  ).returning();
  console.log(`  Inserted ${insertedLaunches.length} launches`);

  // Reset sequences to be after our inserted IDs
  const sqlRaw = neon(process.env.DATABASE_URL!);
  await sqlRaw`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`;
  await sqlRaw`SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects))`;
  await sqlRaw`SELECT setval('contributions_id_seq', (SELECT MAX(id) FROM contributions))`;
  await sqlRaw`SELECT setval('launches_id_seq', (SELECT MAX(id) FROM launches))`;

  console.log('✅ Seeding complete!');
}

seed().catch((e) => {
  console.error('❌ Seed failed:', e);
  process.exit(1);
});
