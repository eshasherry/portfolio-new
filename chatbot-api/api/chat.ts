import { anthropic } from '@ai-sdk/anthropic';
import { streamText, convertToModelMessages } from 'ai';
import { z } from 'zod';
import { portfolioContext } from '../lib/portfolio-context.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://esherry.ca',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const BodySchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    parts: z.array(z.object({
      type: z.string(),
      text: z.string().max(4000).optional(),
    })),
  })).min(1).max(50),
});

function corsResponse(body: string, status: number): Response {
  return new Response(body, { status, headers: CORS_HEADERS });
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (request.method !== 'POST') {
    return corsResponse('Method not allowed', 405);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return corsResponse('Invalid JSON body', 400);
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return corsResponse('Invalid request body', 400);
  }

  try {
    const result = streamText({
      model: anthropic('claude-haiku-4-5-20251001'),
      system: portfolioContext,
      messages: await convertToModelMessages(parsed.data.messages),
      maxTokens: 512,
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error('Chat API error:', err);
    return corsResponse('Internal server error', 500);
  }
}
