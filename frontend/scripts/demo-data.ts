import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm';
import * as schema from '../lib/schema';

const client = neon(process.env.DATABASE_URL!);
const db = drizzle(client, { schema });

async function seed() {
  console.log('🧹 Clearing existing data...');
  await db.delete(schema.upvotes);
  await db.delete(schema.stars);
  await db.delete(schema.contributions);
  await db.delete(schema.launches);
  await db.delete(schema.projects);
  await db.delete(schema.users);

  // Reset sequences
  for (const table of ['users', 'projects', 'contributions', 'launches', 'stars', 'upvotes']) {
    await db.execute(sql.raw(`ALTER SEQUENCE ${table}_id_seq RESTART WITH 1`));
  }

  console.log('👤 Inserting users...');
  const usersData = [
    { username: 'jaketurner', email: 'jake@devmail.io', name: 'Jake Turner', avatarUrl: 'https://i.pravatar.cc/150?img=3', bio: 'Full-stack dev obsessed with React and TypeScript. Building tools that make developers happy.', location: 'San Francisco, CA', website: 'https://jaketurner.dev', githubUsername: 'jaketurner' },
    { username: 'amira_codes', email: 'amira@devmail.io', name: 'Amira Hassan', avatarUrl: 'https://i.pravatar.cc/150?img=5', bio: 'Frontend engineer at heart. Vue.js contributor and CSS wizard. Love mentoring juniors.', location: 'Berlin, Germany', website: 'https://amira.codes', githubUsername: 'amiracodes' },
    { username: 'rustylabs', email: 'rusty@devmail.io', name: 'Marcus Chen', avatarUrl: 'https://i.pravatar.cc/150?img=8', bio: 'Systems programmer. Rust evangelist. Previously at Mozilla. Building the future of safe systems.', location: 'Toronto, Canada', website: 'https://rustylabs.com', githubUsername: 'rustylabs' },
    { username: 'priya_dev', email: 'priya@devmail.io', name: 'Priya Sharma', avatarUrl: 'https://i.pravatar.cc/150?img=9', bio: 'Backend engineer specializing in Go and distributed systems. Open source maintainer.', location: 'Bangalore, India', website: 'https://priyasharma.dev', githubUsername: 'priyadev' },
    { username: 'codewithkai', email: 'kai@devmail.io', name: 'Kai Nakamura', avatarUrl: 'https://i.pravatar.cc/150?img=11', bio: 'DevOps & cloud infrastructure. Kubernetes wrangler. Writing about scalability.', location: 'Tokyo, Japan', website: 'https://codewithkai.com', githubUsername: 'codewithkai' },
    { username: 'sofiadev', email: 'sofia@devmail.io', name: 'Sofia Rodriguez', avatarUrl: 'https://i.pravatar.cc/150?img=20', bio: 'Python developer and data science enthusiast. Django core team member. PyCon speaker.', location: 'Buenos Aires, Argentina', website: 'https://sofiadev.ar', githubUsername: 'sofiadev' },
    { username: 'liam_oss', email: 'liam@devmail.io', name: 'Liam O\'Brien', avatarUrl: 'https://i.pravatar.cc/150?img=15', bio: 'Open source advocate. Node.js contributor. Passionate about developer experience.', location: 'Dublin, Ireland', website: 'https://liamobrien.dev', githubUsername: 'liamoss' },
    { username: 'zara_builds', email: 'zara@devmail.io', name: 'Zara Okafor', avatarUrl: 'https://i.pravatar.cc/150?img=25', bio: 'UI/UX engineer who codes. Svelte enthusiast. Design systems are my love language.', location: 'Lagos, Nigeria', website: 'https://zarabuilds.com', githubUsername: 'zarabuilds' },
    { username: 'maxstack', email: 'max@devmail.io', name: 'Max Petrov', avatarUrl: 'https://i.pravatar.cc/150?img=33', bio: 'Database nerd and PostgreSQL committer. Performance optimization is my cardio.', location: 'Stockholm, Sweden', website: 'https://maxstack.io', githubUsername: 'maxstack' },
    { username: 'noor_tech', email: 'noor@devmail.io', name: 'Noor Al-Rashid', avatarUrl: 'https://i.pravatar.cc/150?img=35', bio: 'Full-stack TypeScript developer. Next.js core contributor. Building the modern web.', location: 'Dubai, UAE', website: 'https://noortech.dev', githubUsername: 'noortech' },
  ];

  const insertedUsers = await db.insert(schema.users).values(usersData).returning();
  console.log(`  ✅ Inserted ${insertedUsers.length} users`);

  console.log('📦 Inserting projects...');
  const projectsData = [
    { name: 'React', slug: 'react', description: 'The library for web and native user interfaces. Build encapsulated components that manage their own state, then compose them to make complex UIs.', repoUrl: 'https://github.com/facebook/react', websiteUrl: 'https://react.dev', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', techStack: ['JavaScript', 'TypeScript', 'Flow'], ownerId: insertedUsers[0].id, platform: 'github' as const, starCount: 225000, isLookingForContributors: true },
    { name: 'Next.js', slug: 'nextjs', description: 'The React framework for the web. Used by some of the world\'s largest companies, Next.js enables you to create full-stack web applications.', repoUrl: 'https://github.com/vercel/next.js', websiteUrl: 'https://nextjs.org', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', techStack: ['TypeScript', 'JavaScript', 'Rust'], ownerId: insertedUsers[9].id, platform: 'github' as const, starCount: 126000, isLookingForContributors: true },
    { name: 'Vue.js', slug: 'vuejs', description: 'An approachable, performant and versatile framework for building web user interfaces.', repoUrl: 'https://github.com/vuejs/core', websiteUrl: 'https://vuejs.org', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', techStack: ['TypeScript', 'JavaScript'], ownerId: insertedUsers[1].id, platform: 'github' as const, starCount: 207000, isLookingForContributors: true },
    { name: 'Svelte', slug: 'svelte', description: 'Cybernetically enhanced web apps. A radical new approach to building user interfaces.', repoUrl: 'https://github.com/sveltejs/svelte', websiteUrl: 'https://svelte.dev', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg', techStack: ['TypeScript', 'JavaScript'], ownerId: insertedUsers[7].id, platform: 'github' as const, starCount: 80000, isLookingForContributors: true },
    { name: 'Tailwind CSS', slug: 'tailwindcss', description: 'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.', repoUrl: 'https://github.com/tailwindlabs/tailwindcss', websiteUrl: 'https://tailwindcss.com', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', techStack: ['CSS', 'JavaScript', 'TypeScript'], ownerId: insertedUsers[0].id, platform: 'github' as const, starCount: 83000, isLookingForContributors: false },
    { name: 'Rust', slug: 'rust', description: 'A language empowering everyone to build reliable and efficient software. Memory safety without garbage collection.', repoUrl: 'https://github.com/rust-lang/rust', websiteUrl: 'https://www.rust-lang.org', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg', techStack: ['Rust'], ownerId: insertedUsers[2].id, platform: 'github' as const, starCount: 98000, isLookingForContributors: true },
    { name: 'Go', slug: 'golang', description: 'An open-source programming language supported by Google. Simple, reliable, and efficient software.', repoUrl: 'https://github.com/golang/go', websiteUrl: 'https://go.dev', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg', techStack: ['Go', 'Assembly'], ownerId: insertedUsers[3].id, platform: 'github' as const, starCount: 124000, isLookingForContributors: true },
    { name: 'Django', slug: 'django', description: 'The web framework for perfectionists with deadlines. Django makes it easier to build better web apps more quickly and with less code.', repoUrl: 'https://github.com/django/django', websiteUrl: 'https://djangoproject.com', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', techStack: ['Python'], ownerId: insertedUsers[5].id, platform: 'github' as const, starCount: 80000, isLookingForContributors: true },
    { name: 'Node.js', slug: 'nodejs', description: 'An open-source, cross-platform JavaScript runtime environment built on Chrome\'s V8 engine.', repoUrl: 'https://github.com/nodejs/node', websiteUrl: 'https://nodejs.org', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', techStack: ['C++', 'JavaScript', 'Python'], ownerId: insertedUsers[6].id, platform: 'github' as const, starCount: 108000, isLookingForContributors: true },
    { name: 'PostgreSQL', slug: 'postgresql', description: 'The world\'s most advanced open source relational database. Powerful, reliable, and feature-rich.', repoUrl: 'https://github.com/postgres/postgres', websiteUrl: 'https://postgresql.org', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', techStack: ['C', 'Perl'], ownerId: insertedUsers[8].id, platform: 'github' as const, starCount: 16000, isLookingForContributors: true },
  ];

  const insertedProjects = await db.insert(schema.projects).values(projectsData).returning();
  console.log(`  ✅ Inserted ${insertedProjects.length} projects`);

  console.log('🔧 Inserting contributions...');
  const p = insertedProjects;
  const u = insertedUsers;
  const contribs = [
    // React contributions
    { userId: u[0].id, projectId: p[0].id, title: 'Fix useEffect cleanup race condition', description: 'Resolved a race condition in useEffect cleanup when components unmount rapidly', url: 'https://github.com/facebook/react/pull/28341', type: 'pull_request' as const, platform: 'github' },
    { userId: u[9].id, projectId: p[0].id, title: 'Add RSC payload streaming support', url: 'https://github.com/facebook/react/pull/28125', type: 'pull_request' as const, platform: 'github' },
    { userId: u[1].id, projectId: p[0].id, title: 'Improve error boundary documentation', url: 'https://github.com/facebook/react/issues/28200', type: 'issue' as const, platform: 'github' },
    // Next.js contributions
    { userId: u[9].id, projectId: p[1].id, title: 'Optimize App Router caching strategy', url: 'https://github.com/vercel/next.js/pull/59842', type: 'pull_request' as const, platform: 'github' },
    { userId: u[0].id, projectId: p[1].id, title: 'Fix middleware redirect loop in edge runtime', url: 'https://github.com/vercel/next.js/pull/59100', type: 'pull_request' as const, platform: 'github' },
    { userId: u[4].id, projectId: p[1].id, title: 'Review: Server Actions error handling refactor', url: 'https://github.com/vercel/next.js/pull/58900', type: 'review' as const, platform: 'github' },
    // Vue contributions
    { userId: u[1].id, projectId: p[2].id, title: 'Implement defineModel compiler macro', url: 'https://github.com/vuejs/core/pull/8018', type: 'pull_request' as const, platform: 'github' },
    { userId: u[7].id, projectId: p[2].id, title: 'Fix reactivity edge case with computed refs', url: 'https://github.com/vuejs/core/commit/a1b2c3d', type: 'commit' as const, platform: 'github' },
    { userId: u[3].id, projectId: p[2].id, title: 'Teleport component not working with SSR', url: 'https://github.com/vuejs/core/issues/9200', type: 'issue' as const, platform: 'github' },
    // Svelte contributions
    { userId: u[7].id, projectId: p[3].id, title: 'Add runes reactivity system', url: 'https://github.com/sveltejs/svelte/pull/9800', type: 'pull_request' as const, platform: 'github' },
    { userId: u[1].id, projectId: p[3].id, title: 'Fix transition memory leak in each blocks', url: 'https://github.com/sveltejs/svelte/pull/9650', type: 'pull_request' as const, platform: 'github' },
    { userId: u[0].id, projectId: p[3].id, title: 'Review: Svelte 5 migration guide', url: 'https://github.com/sveltejs/svelte/pull/9500', type: 'review' as const, platform: 'github' },
    // Tailwind contributions
    { userId: u[0].id, projectId: p[4].id, title: 'Add container query support', url: 'https://github.com/tailwindlabs/tailwindcss/pull/12300', type: 'pull_request' as const, platform: 'github' },
    { userId: u[7].id, projectId: p[4].id, title: 'Fix dark mode class strategy specificity', url: 'https://github.com/tailwindlabs/tailwindcss/commit/e4f5g6h', type: 'commit' as const, platform: 'github' },
    // Rust contributions
    { userId: u[2].id, projectId: p[5].id, title: 'Improve borrow checker error messages', url: 'https://github.com/rust-lang/rust/pull/118500', type: 'pull_request' as const, platform: 'github' },
    { userId: u[3].id, projectId: p[5].id, title: 'Stabilize async_fn_in_trait feature', url: 'https://github.com/rust-lang/rust/pull/117200', type: 'pull_request' as const, platform: 'github' },
    { userId: u[4].id, projectId: p[5].id, title: 'Review: SIMD intrinsics for aarch64', url: 'https://github.com/rust-lang/rust/pull/116800', type: 'review' as const, platform: 'github' },
    { userId: u[2].id, projectId: p[5].id, title: 'Fix ICE in pattern matching exhaustiveness check', url: 'https://github.com/rust-lang/rust/issues/118600', type: 'issue' as const, platform: 'github' },
    // Go contributions
    { userId: u[3].id, projectId: p[6].id, title: 'Add range over function iterators', url: 'https://github.com/golang/go/pull/61405', type: 'pull_request' as const, platform: 'github' },
    { userId: u[4].id, projectId: p[6].id, title: 'Optimize garbage collector pause times', url: 'https://github.com/golang/go/commit/i7j8k9l', type: 'commit' as const, platform: 'github' },
    { userId: u[2].id, projectId: p[6].id, title: 'Proposal: structured logging in stdlib', url: 'https://github.com/golang/go/issues/61200', type: 'issue' as const, platform: 'github' },
    // Django contributions
    { userId: u[5].id, projectId: p[7].id, title: 'Add async ORM support for QuerySet', url: 'https://github.com/django/django/pull/17500', type: 'pull_request' as const, platform: 'github' },
    { userId: u[6].id, projectId: p[7].id, title: 'Fix N+1 query in prefetch_related', url: 'https://github.com/django/django/pull/17300', type: 'pull_request' as const, platform: 'github' },
    { userId: u[5].id, projectId: p[7].id, title: 'Review: Django 5.0 deprecation cleanup', url: 'https://github.com/django/django/pull/17100', type: 'review' as const, platform: 'github' },
    // Node.js contributions
    { userId: u[6].id, projectId: p[8].id, title: 'Implement native fetch API improvements', url: 'https://github.com/nodejs/node/pull/50200', type: 'pull_request' as const, platform: 'github' },
    { userId: u[4].id, projectId: p[8].id, title: 'Fix worker thread memory leak', url: 'https://github.com/nodejs/node/pull/49800', type: 'pull_request' as const, platform: 'github' },
    { userId: u[9].id, projectId: p[8].id, title: 'Add permission model for file system access', url: 'https://github.com/nodejs/node/commit/m1n2o3p', type: 'commit' as const, platform: 'github' },
    { userId: u[6].id, projectId: p[8].id, title: 'ESM loader hooks cause segfault on Windows', url: 'https://github.com/nodejs/node/issues/50100', type: 'issue' as const, platform: 'github' },
    // PostgreSQL contributions
    { userId: u[8].id, projectId: p[9].id, title: 'Improve JSONB query planner performance', url: 'https://github.com/postgres/postgres/commit/q4r5s6t', type: 'commit' as const, platform: 'github' },
    { userId: u[8].id, projectId: p[9].id, title: 'Add parallel index creation for BRIN indexes', url: 'https://github.com/postgres/postgres/pull/450', type: 'pull_request' as const, platform: 'github' },
    { userId: u[5].id, projectId: p[9].id, title: 'Fix vacuum freeze logic for large tables', url: 'https://github.com/postgres/postgres/commit/u7v8w9x', type: 'commit' as const, platform: 'github' },
    { userId: u[3].id, projectId: p[9].id, title: 'Review: Logical replication improvements', url: 'https://github.com/postgres/postgres/pull/460', type: 'review' as const, platform: 'github' },
  ];

  const insertedContribs = await db.insert(schema.contributions).values(contribs).returning();
  console.log(`  ✅ Inserted ${insertedContribs.length} contributions`);

  console.log('🚀 Inserting launches...');
  const launchesData = [
    { projectId: p[0].id, launchedById: u[0].id, tagline: 'React 19 — Actions, Server Components & more', description: 'React 19 introduces Actions for handling form submissions, Server Components for zero-bundle-size components, and a new compiler that automatically memoizes your code. The biggest release since hooks.', upvoteCount: 892, isFeatured: true, launchedAt: new Date('2025-12-05') },
    { projectId: p[1].id, launchedById: u[9].id, tagline: 'Next.js 15 — Turbopack stable, partial prerendering', description: 'Next.js 15 ships with stable Turbopack for lightning-fast dev server, partial prerendering for the best of static and dynamic, and enhanced caching defaults.', upvoteCount: 743, isFeatured: true, launchedAt: new Date('2025-10-26') },
    { projectId: p[3].id, launchedById: u[7].id, tagline: 'Svelte 5 — Runes change everything', description: 'Svelte 5 introduces runes, a set of primitives for controlling reactivity. More powerful, more composable, and still the most loved framework.', upvoteCount: 621, isFeatured: true, launchedAt: new Date('2025-10-18') },
    { projectId: p[5].id, launchedById: u[2].id, tagline: 'Rust 2024 Edition — safer, faster, friendlier', description: 'The Rust 2024 edition brings improved async ergonomics, better error messages, and new standard library APIs. Systems programming has never been more accessible.', upvoteCount: 534, isFeatured: false, launchedAt: new Date('2025-11-15') },
    { projectId: p[7].id, launchedById: u[5].id, tagline: 'Django 5.1 — async all the things', description: 'Django 5.1 completes the async journey with full async ORM support, async middleware, and async template rendering. Your favorite framework, now fully async-capable.', upvoteCount: 412, isFeatured: false, launchedAt: new Date('2025-08-20') },
    { projectId: p[9].id, launchedById: u[8].id, tagline: 'PostgreSQL 17 — performance that speaks for itself', description: 'PostgreSQL 17 delivers massive performance improvements for JSONB operations, improved logical replication, and native support for vector similarity search.', upvoteCount: 389, isFeatured: false, launchedAt: new Date('2025-09-14') },
  ];

  const insertedLaunches = await db.insert(schema.launches).values(launchesData).returning();
  console.log(`  ✅ Inserted ${insertedLaunches.length} launches`);

  console.log('⭐ Inserting stars...');
  const starsData = [
    // Users starring projects
    { userId: u[1].id, targetType: 'project', targetId: p[0].id },
    { userId: u[2].id, targetType: 'project', targetId: p[0].id },
    { userId: u[3].id, targetType: 'project', targetId: p[1].id },
    { userId: u[4].id, targetType: 'project', targetId: p[1].id },
    { userId: u[5].id, targetType: 'project', targetId: p[2].id },
    { userId: u[6].id, targetType: 'project', targetId: p[3].id },
    { userId: u[7].id, targetType: 'project', targetId: p[5].id },
    { userId: u[8].id, targetType: 'project', targetId: p[6].id },
    { userId: u[9].id, targetType: 'project', targetId: p[8].id },
    { userId: u[0].id, targetType: 'project', targetId: p[9].id },
    // Users starring other users
    { userId: u[0].id, targetType: 'user', targetId: u[9].id },
    { userId: u[1].id, targetType: 'user', targetId: u[7].id },
    { userId: u[2].id, targetType: 'user', targetId: u[3].id },
    { userId: u[5].id, targetType: 'user', targetId: u[8].id },
  ];
  await db.insert(schema.stars).values(starsData);
  console.log(`  ✅ Inserted ${starsData.length} stars`);

  console.log('👍 Inserting upvotes...');
  const upvotesData = [
    { userId: u[1].id, launchId: insertedLaunches[0].id },
    { userId: u[2].id, launchId: insertedLaunches[0].id },
    { userId: u[3].id, launchId: insertedLaunches[0].id },
    { userId: u[4].id, launchId: insertedLaunches[1].id },
    { userId: u[5].id, launchId: insertedLaunches[1].id },
    { userId: u[6].id, launchId: insertedLaunches[2].id },
    { userId: u[7].id, launchId: insertedLaunches[3].id },
    { userId: u[8].id, launchId: insertedLaunches[4].id },
    { userId: u[9].id, launchId: insertedLaunches[5].id },
    { userId: u[0].id, launchId: insertedLaunches[2].id },
  ];
  await db.insert(schema.upvotes).values(upvotesData);
  console.log(`  ✅ Inserted ${upvotesData.length} upvotes`);

  console.log('\n🎉 Demo data seeded successfully!');
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
