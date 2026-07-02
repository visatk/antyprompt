import { Hono } from 'hono';

const app = new Hono<{ Bindings: Env }>();

// ─── Prompt data (mirrors frontend data) ───
// In a production app, this would come from D1 database
// For now, the frontend data/prompts.ts is the source of truth

app.get('/api/', (c) => {
  return c.json({
    name: 'PromptForge API',
    version: '1.0.0',
    description: 'AI Prompt Library for Antigravity 2+',
    endpoints: {
      '/api/health': 'Health check',
      '/api/stats': 'Prompt library statistics',
    },
  });
});

app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    runtime: 'Cloudflare Workers',
  });
});

app.get('/api/stats', (c) => {
  return c.json({
    totalPrompts: 50,
    totalCategories: 10,
    version: '1.0.0',
    lastUpdated: '2026-07-03',
    platform: 'Google Antigravity 2+',
  });
});

// Catch-all for unknown API routes
app.all('/api/*', (c) => {
  return c.json({ error: 'Not Found', message: 'The requested API endpoint does not exist.' }, 404);
});

export default {
  fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Only handle /api/ routes with Hono
    if (url.pathname.startsWith('/api/')) {
      return app.fetch(request, env, ctx);
    }

    // For non-API routes, return 404 (assets are handled by CF)
    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
