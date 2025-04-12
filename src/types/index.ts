export interface Startup {
  id: string;
  name: string;
  description: string;
  pitchDeckLink: string;
  market: string;
  stage: 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c';
  fundingGoal: number;
  revenue: number;
  users: number;
  cac: number;
  churn: number;
  successScore: number;
  createdAt: string;
  updatedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Investment {
  id: string;
  startupId: string;
  amount: number;
  createdAt: string;
}

export interface StartupMetrics {
  totalInvestments: number;
  averageInvestment: number;
  investorCount: number;
} 