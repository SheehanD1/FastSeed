import OpenAI from 'openai';
import { Startup } from '../types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function calculateSuccessScore(startup: Startup): Promise<number> {
  const prompt = `
    Analyze the following startup and provide a success probability score (0-100):
    
    Name: ${startup.name}
    Description: ${startup.description}
    Market: ${startup.market}
    Stage: ${startup.stage}
    Funding Goal: $${startup.fundingGoal}
    Monthly Revenue: $${startup.revenue}
    Users: ${startup.users}
    CAC: $${startup.cac}
    Churn Rate: ${startup.churn}%
    
    Consider factors like:
    - Market size and growth potential
    - Revenue and user growth
    - Unit economics (CAC, churn)
    - Funding stage and goals
    - Competitive landscape
    
    Return ONLY a number between 0 and 100 representing the success probability.
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are an expert startup analyst. Provide only a number between 0 and 100 as your response.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 10,
  });

  const score = parseInt(response.choices[0].message.content || '50');
  return Math.min(Math.max(score, 0), 100); // Ensure score is between 0 and 100
} 