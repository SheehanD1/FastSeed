import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent('Hello, Gemini!');
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ success: true, response: text });
  } catch (error) {
    console.error('Gemini API test error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to connect to Gemini API' },
      { status: 500 }
    );
  }
} 