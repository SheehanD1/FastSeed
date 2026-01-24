
import { NextResponse } from 'next/server';
import { analyzeStartup } from '@/lib/gemini';

export async function POST(req: Request) {
    try {
        const startupData = await req.json();

        if (!startupData || !startupData.name || !startupData.description) {
            return NextResponse.json({ error: 'Startup name and description are required' }, { status: 400 });
        }

        // Call the existing utility logic
        const analysis = await analyzeStartup(startupData);

        return NextResponse.json({ analysis });

    } catch (error) {
        console.error('Analysis API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
