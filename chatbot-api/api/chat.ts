import { anthropic } from '@ai-sdk/anthropic';
import { streamText, convertToModelMessages } from 'ai';
import { portfolioContext } from '../lib/portfolio-context.js';

export default async function handler(request: Request): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { messages } = await request.json();

  const result = streamText({
    model: anthropic('claude-haiku-4-5-20251001'),
    system: portfolioContext,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
