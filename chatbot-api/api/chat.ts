import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';
import { z } from 'zod';
import { portfolioContext } from '../lib/portfolio-context.js';

export const config = { runtime: 'edge' };

const ALLOWED_ORIGINS = new Set([
  'https://esherry.ca',
  'https://www.esherry.ca',
  'https://eshasherry.github.io',
]);

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') ?? '';
  const allowed = ALLOWED_ORIGINS.has(origin) ? origin : 'https://esherry.ca';
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

const BodySchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    parts: z.array(z.object({
      type: z.string(),
    }).passthrough()),
  })).min(1).max(50),
});

function corsResponse(request: Request, body: string, status: number): Response {
  return new Response(body, { status, headers: corsHeaders(request) });
}

export default async function handler(request: Request): Promise<Response> {
  const headers = corsHeaders(request);

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (request.method !== 'POST') {
    return corsResponse(request, 'Method not allowed', 405);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return corsResponse(request, 'Invalid JSON body', 400);
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return corsResponse(request, 'Invalid request body', 400);
  }

  try {
    const result = streamText({
      model: google('gemini-2.5-flash'),
      system: portfolioContext,
      messages: await convertToModelMessages(parsed.data.messages),
      maxOutputTokens: 512,
    });

    return result.toUIMessageStreamResponse({ headers });
  } catch (err) {
    console.error('Chat API error:', err);
    return corsResponse(request, 'Internal server error', 500);
  }
}
