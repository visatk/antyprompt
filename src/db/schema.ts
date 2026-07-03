import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  role: text('role').default('user').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  icon: text('icon').notNull(),
  emoji: text('emoji').notNull(),
  description: text('description').notNull(),
  gradient: text('gradient').notNull(),
});

export const prompts = sqliteTable('prompts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  categoryId: text('category_id').references(() => categories.id).notNull(),
  userId: text('user_id').references(() => users.id),
  difficulty: text('difficulty').notNull(), // 'beginner' | 'intermediate' | 'advanced'
  tags: text('tags', { mode: 'json' }).$type<string[]>().notNull(),
  promptTemplate: text('prompt_template').notNull(),
  useCase: text('use_case').notNull(),
  expectedOutput: text('expected_output').notNull(),
  isPro: integer('is_pro', { mode: 'boolean' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});
