import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  pgEnum,
  uniqueIndex,
  unique,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const platformEnum = pgEnum('platform', ['github', 'gitlab', 'bitbucket', 'manual']);
export const contributionTypeEnum = pgEnum('contribution_type', ['pull_request', 'commit', 'issue', 'review']);

// Users
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').unique(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  bio: text('bio'),
  location: text('location'),
  website: text('website'),
  githubUsername: text('github_username'),
  gitlabUsername: text('gitlab_username'),
  githubId: text('github_id'),
  title: text('title'),
  skills: text('skills').array(),
  skillLevels: text('skill_levels').array(),
  followers: integer('followers').default(0),
  following: integer('following').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Projects
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  repoUrl: text('repo_url'),
  websiteUrl: text('website_url'),
  logo: text('logo'),
  techStack: text('tech_stack').array(),
  ownerId: integer('owner_id').references(() => users.id).notNull(),
  platform: platformEnum('platform').notNull(),
  starCount: integer('star_count').default(0).notNull(),
  isLookingForContributors: boolean('is_looking_for_contributors').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Contributions
export const contributions = pgTable('contributions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  projectId: integer('project_id').references(() => projects.id).notNull(),
  title: text('title').notNull(),
  description: text('description'),
  url: text('url'),
  type: contributionTypeEnum('type').notNull(),
  platform: text('platform'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Launches
export const launches = pgTable('launches', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => projects.id).notNull(),
  launchedById: integer('launched_by_id').references(() => users.id).notNull(),
  tagline: text('tagline'),
  description: text('description'),
  upvoteCount: integer('upvote_count').default(0).notNull(),
  isFeatured: boolean('is_featured').default(false).notNull(),
  launchedAt: timestamp('launched_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Stars
export const stars = pgTable('stars', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  targetType: text('target_type').notNull(), // 'user' or 'project'
  targetId: integer('target_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => [
  unique('stars_user_target_unique').on(t.userId, t.targetType, t.targetId),
]);

// Upvotes
export const upvotes = pgTable('upvotes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  launchId: integer('launch_id').references(() => launches.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => [
  unique('upvotes_user_launch_unique').on(t.userId, t.launchId),
]);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  contributions: many(contributions),
  launches: many(launches),
  stars: many(stars),
  upvotes: many(upvotes),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  owner: one(users, { fields: [projects.ownerId], references: [users.id] }),
  contributions: many(contributions),
  launches: many(launches),
}));

export const contributionsRelations = relations(contributions, ({ one }) => ({
  user: one(users, { fields: [contributions.userId], references: [users.id] }),
  project: one(projects, { fields: [contributions.projectId], references: [projects.id] }),
}));

export const launchesRelations = relations(launches, ({ one, many }) => ({
  project: one(projects, { fields: [launches.projectId], references: [projects.id] }),
  launchedBy: one(users, { fields: [launches.launchedById], references: [users.id] }),
  upvotes: many(upvotes),
}));

export const starsRelations = relations(stars, ({ one }) => ({
  user: one(users, { fields: [stars.userId], references: [users.id] }),
}));

export const upvotesRelations = relations(upvotes, ({ one }) => ({
  user: one(users, { fields: [upvotes.userId], references: [users.id] }),
  launch: one(launches, { fields: [upvotes.launchId], references: [launches.id] }),
}));
