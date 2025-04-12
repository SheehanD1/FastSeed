'use client';

import React, { useState } from 'react';
import { Startup } from '../types';
import StartupCard from '../components/StartupCard';
import CreateStartupForm from '../components/CreateStartupForm';
import Leaderboard from '../components/Leaderboard';

async function getStartups(): Promise<Startup[]> {
  try {
    const response = await fetch('http://localhost:3000/api/startups');
    if (!response.ok) {
      throw new Error('Failed to fetch startups');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching startups:', error);
    // Return sample data for development
    return [
      {
        id: '1',
        name: 'TechFlow',
        description: 'AI-powered workflow automation for enterprises',
        pitchDeckLink: 'https://example.com/pitch',
        market: 'Enterprise SaaS',
        stage: 'seed',
        fundingGoal: 2000000,
        revenue: 75000,
        users: 2500,
        cac: 150,
        churn: 0.03,
        successScore: 85,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'approved',
      },
      {
        id: '2',
        name: 'GreenEnergy',
        description: 'Renewable energy solutions for smart homes',
        pitchDeckLink: 'https://example.com/pitch',
        market: 'CleanTech',
        stage: 'series-a',
        fundingGoal: 5000000,
        revenue: 250000,
        users: 10000,
        cac: 200,
        churn: 0.02,
        successScore: 92,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'approved',
      },
      {
        id: '3',
        name: 'HealthTrack',
        description: 'AI-powered health monitoring platform',
        pitchDeckLink: 'https://example.com/pitch',
        market: 'HealthTech',
        stage: 'pre-seed',
        fundingGoal: 1000000,
        revenue: 25000,
        users: 500,
        cac: 100,
        churn: 0.05,
        successScore: 78,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'approved',
      },
    ];
  }
}

export default function Home() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const fetchStartups = async () => {
      const data = await getStartups();
      setStartups(data);
      setIsLoading(false);
    };
    fetchStartups();
  }, []);

  const handleSubmitStartup = async (data: any) => {
    try {
      const response = await fetch('/api/startups/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit startup');
      }

      const newStartup = await response.json();
      setStartups(prev => [newStartup, ...prev]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting startup:', error);
      alert('Failed to submit startup. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Startup Investment Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover and invest in promising startups
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            List Your Startup
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {startups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <Leaderboard startups={startups} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">List Your Startup</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <CreateStartupForm onSubmit={handleSubmitStartup} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 