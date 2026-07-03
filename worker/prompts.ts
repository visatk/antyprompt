import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { eq, desc } from 'drizzle-orm';
import { prompts, categories, users } from '../src/db/schema';
import { verify } from 'hono/jwt';
import { getCookie } from 'hono/cookie';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import type { Env } from './index';

// We import the static data for the seeder
import { categories as staticCategories, prompts as staticPrompts } from '../src/data/prompts';

const promptsApp = new Hono<{ Bindings: Env; Variables: { user: any } }>();

// Global error handler for promptsApp
promptsApp.onError((err, c) => {
  console.error(`Prompts API Error: ${err.message}`);
  return c.json({ error: 'Internal Server Error' }, 500);
});

// Simple auth middleware
const authMiddleware = async (c: any, next: any) => {
  const token = getCookie(c, 'auth_token');
  if (!token) return c.json({ error: 'Unauthorized' }, 401);
  try {
    const decoded = await verify(token, c.env.JWT_SECRET || 'fallback-secret-for-dev');
    c.set('user', decoded);
    await next();
  } catch {
    return c.json({ error: 'Unauthorized' }, 401);
  }
};

// GET /api/data/categories
promptsApp.get('/categories', async (c) => {
  const db = drizzle(c.env.DB);
  const result = await db.select().from(categories);
  return c.json(result);
});

// GET /api/data/prompts
promptsApp.get('/prompts', async (c) => {
  const db = drizzle(c.env.DB);
  const result = await db
    .select({
      id: prompts.id,
      title: prompts.title,
      description: prompts.description,
      categoryId: prompts.categoryId,
      difficulty: prompts.difficulty,
      tags: prompts.tags,
      promptTemplate: prompts.promptTemplate,
      useCase: prompts.useCase,
      expectedOutput: prompts.expectedOutput,
      isPro: prompts.isPro,
      createdAt: prompts.createdAt,
      authorName: users.name,
    })
    .from(prompts)
    .leftJoin(users, eq(prompts.userId, users.id))
    .orderBy(desc(prompts.createdAt));
  
  // Transform the tags JSON string back to array if needed
  const formatted = result.map(p => ({
    ...p,
    category: p.categoryId, // map back to frontend type
    tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags,
  }));
  
  return c.json(formatted);
});

// POST /api/data/prompts (Create a new prompt)
const promptSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  categoryId: z.string(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  tags: z.array(z.string()).min(1),
  promptTemplate: z.string().min(10),
  useCase: z.string().min(5),
  expectedOutput: z.string().min(5),
});

promptsApp.post('/prompts', authMiddleware, zValidator('json', promptSchema), async (c) => {
  const user = c.get('user');
  const data = c.req.valid('json');
  const db = drizzle(c.env.DB);

  try {
    const newPromptId = 'usr-' + crypto.randomUUID().slice(0, 8);
    await db.insert(prompts).values({
      id: newPromptId,
      title: data.title,
      description: data.description,
      categoryId: data.categoryId,
      difficulty: data.difficulty,
      tags: data.tags,
      promptTemplate: data.promptTemplate,
      useCase: data.useCase,
      expectedOutput: data.expectedOutput,
      isPro: false,
      userId: user.id,
      createdAt: new Date(),
    });

    return c.json({ success: true, id: newPromptId });
  } catch (error: any) {
    return c.json({ error: 'Failed to create prompt' }, 500);
  }
});

// POST /api/data/seed (Protected in production, open for local dev)
promptsApp.post('/seed', async (c) => {
  const db = drizzle(c.env.DB);
  
  try {
    // Basic protection: clear existing data
    await db.delete(prompts).execute();
    await db.delete(categories).execute();

    // Insert categories
    if (staticCategories.length > 0) {
      await db.insert(categories).values(staticCategories).execute();
    }

    // Insert prompts
    if (staticPrompts.length > 0) {
      const promptValues = staticPrompts.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        categoryId: p.category,
        difficulty: p.difficulty,
        tags: p.tags,
        promptTemplate: p.promptTemplate,
        useCase: p.useCase,
        expectedOutput: p.expectedOutput,
        isPro: p.isPro,
      }));
      await db.insert(prompts).values(promptValues).execute();
    }

    return c.json({ success: true, message: 'Database seeded successfully' });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

export default promptsApp;
