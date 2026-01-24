import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function analyzeStartup(startupData: {
  name: string;
  description: string;
  market: string;
  team: string;
  revenue: string;
  funding: string;
}) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Analyze this startup and provide insights:
    Name: ${startupData.name}
    Description: ${startupData.description}
    Market: ${startupData.market}
    Team: ${startupData.team}
    Revenue: ${startupData.revenue}
    Funding: ${startupData.funding}

    Please provide:
    1. Market potential analysis
    2. Team strength assessment
    3. Revenue model evaluation
    4. Investment recommendation
    5. Success probability (0-100%)
    6. Key risks and challenges
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function embedText(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ model: 'embedding-001' });
  const result = await model.embedContent(text);
  const embedding = result.embedding;
  return embedding.values;
}

export async function getMarketTrends(market: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Analyze current trends in the ${market} market:
    1. Market size and growth
    2. Key players and competition
    3. Emerging technologies
    4. Investment opportunities
    5. Future predictions
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function generateInvestmentRecommendations(userPreferences: {
  riskTolerance: 'low' | 'medium' | 'high';
  investmentAmount: string;
  preferredSectors: string[];
}) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Generate investment recommendations based on:
    Risk Tolerance: ${userPreferences.riskTolerance}
    Investment Amount: ${userPreferences.investmentAmount}
    Preferred Sectors: ${userPreferences.preferredSectors.join(', ')}

    Please provide:
    1. Recommended investment strategy
    2. Portfolio allocation suggestions
    3. Specific startup recommendations
    4. Risk management advice
    5. Expected returns
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
} 