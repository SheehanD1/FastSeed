
import { NextResponse } from 'next/server';
import { embedText } from '@/lib/gemini';
import { searchStartups } from '@/lib/vectorSearch';

export async function POST(req: Request) {
    try {
        const { query } = await req.json();

        if (!query) {
            return NextResponse.json({ error: 'Query is required' }, { status: 400 });
        }

        // 1. Generate embedding for user query
        const queryEmbedding = await embedText(query);

        // 2. Perform vector search
        // Increasing limit to get a good candidate pool
        const results = await searchStartups(queryEmbedding, 10);

        return NextResponse.json({ results });
    } catch (error) {
        console.error('Search API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
