import { NextResponse } from 'next/server';

// Mock data for development
const mockStartups = [
  {
    id: '1',
    name: 'TechCorp',
    description: 'A revolutionary tech company',
    market: 'Technology',
    stage: 'Seed',
    fundingGoal: 1000000,
    revenue: 50000,
    users: 1000,
    cac: 50,
    churn: 5,
    pitchDeckUrl: 'https://example.com/pitch1.pdf',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'HealthTech',
    description: 'Healthcare innovation platform',
    market: 'Healthcare',
    stage: 'Series A',
    fundingGoal: 5000000,
    revenue: 200000,
    users: 5000,
    cac: 100,
    churn: 3,
    pitchDeckUrl: 'https://example.com/pitch2.pdf',
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    // Return mock data
    return NextResponse.json(mockStartups);
  } catch (error) {
    console.error('Error fetching startups:', error);
    return NextResponse.json(
      { error: 'Failed to fetch startups' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Create a new mock startup
    const newStartup = {
      id: (mockStartups.length + 1).toString(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    
    // Add to mock data (in memory only)
    mockStartups.push(newStartup);
    
    return NextResponse.json(newStartup, { status: 201 });
  } catch (error) {
    console.error('Error creating startup:', error);
    return NextResponse.json(
      { error: 'Failed to create startup' },
      { status: 500 }
    );
  }
} 