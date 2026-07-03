import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { sign, verify } from 'hono/jwt';
import { setCookie, getCookie, deleteCookie } from 'hono/cookie';
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { users } from '../src/db/schema.js';
import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto';

export type Env = {
  DB: D1Database;
  JWT_SECRET: string;
};

const authApp = new Hono<{ Bindings: Env }>();

// Advanced hash function using node:crypto (scrypt)
function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derivedKey}`;
}

function verifyPassword(password: string, hash: string): boolean {
  const [salt, key] = hash.split(':');
  if (!salt || !key) return false;
  
  const keyBuffer = Buffer.from(key, 'hex');
  const derivedKey = scryptSync(password, salt, 64);
  
  // Prevent timing attacks
  if (keyBuffer.length !== derivedKey.length) return false;
  return timingSafeEqual(keyBuffer, derivedKey);
}

// Global error handler for authApp
authApp.onError((err, c) => {
  console.error(`Auth API Error: ${err.message}`);
  return c.json({ error: 'Internal Server Error' }, 500);
});

// ─── Sign Up ───
const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

authApp.post('/signup', zValidator('json', signupSchema), async (c) => {
  const { name, email, password } = c.req.valid('json');
  const db = drizzle(c.env.DB);

  try {
    const existing = await db.select().from(users).where(eq(users.email, email)).get();
    if (existing) {
      return c.json({ error: 'Email already exists' }, 400);
    }

    const passwordHash = hashPassword(password);
    const userId = crypto.randomUUID();

    await db.insert(users).values({
      id: userId,
      email,
      name,
      passwordHash,
      role: 'user',
      createdAt: new Date(),
    });

    if (!c.env.JWT_SECRET) throw new Error('JWT_SECRET is not configured');
    const token = await sign({ id: userId, email, name, role: 'user' }, c.env.JWT_SECRET);
    
    setCookie(c, 'auth_token', token, {
      httpOnly: true,
      secure: new URL(c.req.url).protocol === 'https:',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return c.json({ success: true, user: { id: userId, name, email, role: 'user' } });
  } catch (error: any) {
    return c.json({ error: error.message || 'Signup failed' }, 500);
  }
});

// ─── Login ───
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

authApp.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = c.req.valid('json');
  const db = drizzle(c.env.DB);

  try {
    const user = await db.select().from(users).where(eq(users.email, email)).get();
    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    if (!c.env.JWT_SECRET) throw new Error('JWT_SECRET is not configured');
    const token = await sign({ id: user.id, email: user.email, name: user.name, role: user.role }, c.env.JWT_SECRET);
    
    setCookie(c, 'auth_token', token, {
      httpOnly: true,
      secure: new URL(c.req.url).protocol === 'https:',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return c.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error: any) {
    return c.json({ error: 'Login failed' }, 500);
  }
});

// ─── Logout ───
authApp.post('/logout', (c) => {
  deleteCookie(c, 'auth_token', { path: '/' });
  return c.json({ success: true });
});

// ─── Get Me ───
authApp.get('/me', async (c) => {
  const token = getCookie(c, 'auth_token');
  if (!token) return c.json({ user: null });

  try {
    if (!c.env.JWT_SECRET) throw new Error('JWT_SECRET is not configured');
    const decoded = await verify(token, c.env.JWT_SECRET, 'HS256');
    return c.json({ user: decoded });
  } catch {
    return c.json({ user: null });
  }
});

export default authApp;
