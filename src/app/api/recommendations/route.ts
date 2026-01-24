
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { embedText } from '@/lib/gemini';
import { searchStartups } from '@/lib/vectorSearch';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
    try {
        const { userPreferences } = await req.json();

        if (!userPreferences) {
            return NextResponse.json({ error: 'User preferences are required' }, { status: 400 });
        }

        // 1. Create a "synthetic query" from user preferences to find relevant startups
        // e.g., "High risk biotech startups"
        const syntheticQuery = `${userPreferences.riskTolerance} risk ${userPreferences.preferredSectors.join(' ')} startups`;
        const queryEmbedding = await embedText(syntheticQuery);

        // 2. Retrieve relevant context (RAG)
        const relevantStartups = await searchStartups(queryEmbedding, 5);

        // 3. Format context for Gemini
        const startupsContext = relevantStartups.map(s =>
            `- ${s.name} (${s.market}): ${s.description}. Revenue: ${s.revenue}. Funding: ${s.funding}`
        ).join('\n');

        // 4. Generate recommendations with context
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const prompt = `
      You are an expert venture capital investment advisor.
      
      User Profile:
      - Risk Tolerance: ${userPreferences.riskTolerance}
      - Investment Amount: ${userPreferences.investmentAmount}
      - Preferred Sectors: ${userPreferences.preferredSectors.join(', ')}

      Based on the following actual startups in our database, provide personalized investment advice:

      ${startupsContext}

      Response Structure:
      1. **Strategy**: A brief strategy aligning with their risk profile.
      2. **Top Picks**: Select 2-3 startups from the list above that best fit the profile. Explain WHY.
      3. **Risk Analysis**: Specific risks for these choices.

      Constraint: Do NOT recommend fictitious companies. Only use the provided context.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const recommendationText = response.text();

        return NextResponse.json({
            recommendation: recommendationText,
            context: relevantStartups // Return raw startups too so frontend can display cards
        });

    } catch (error) {
        console.error('Recommendation API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
