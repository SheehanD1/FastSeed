
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Startup {
  name: string;
  description: string;
  market: string;
  revenue: string;
  funding: string;
}

export default function RecommendationsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [context, setContext] = useState<Startup[]>([]);
  const [preferences, setPreferences] = useState({
    riskTolerance: 'medium',
    investmentAmount: '$10k - $50k',
    preferredSectors: [] as string[]
  });

  const availableSectors = ['AI', 'FinTech', 'HealthTech', 'ClimateTech', 'EdTech', 'BioTech', 'Web3', 'Robotics'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setContext([]);

    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPreferences: preferences })
      });
      const data = await response.json();
      if (data.recommendation) {
        setResult(data.recommendation);
        setContext(data.context || []);
      } else {
        alert('Failed to get recommendations');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSectorToggle = (sector: string) => {
    setPreferences(prev => {
      const current = prev.preferredSectors;
      if (current.includes(sector)) {
        return { ...prev, preferredSectors: current.filter(s => s !== sector) };
      } else {
        return { ...prev, preferredSectors: [...current, sector] };
      }
    });
  };

  return (
    <div className="min-h-screen bg-rh-light p-8">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => router.back()} className="mb-4 text-rh-blue hover:underline">
          &larr; Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-rh-dark mb-8">Personalized Investment Recommendations</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preferences Form */}
          <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Your Investment Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Risk Tolerance</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={preferences.riskTolerance}
                  onChange={(e) => setPreferences({ ...preferences, riskTolerance: e.target.value })}
                >
                  <option value="low">Low Risk (Conservative)</option>
                  <option value="medium">Medium Risk (Balanced)</option>
                  <option value="high">High Risk (Aggressive)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={preferences.investmentAmount}
                  onChange={(e) => setPreferences({ ...preferences, investmentAmount: e.target.value })}
                >
                  <option value="<$10k">Less than $10k</option>
                  <option value="$10k - $50k">$10k - $50k</option>
                  <option value="$50k - $250k">$50k - $250k</option>
                  <option value="$250k+">$250k+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Sectors</label>
                <div className="flex flex-wrap gap-2">
                  {availableSectors.map(sector => (
                    <button
                      key={sector}
                      type="button"
                      onClick={() => handleSectorToggle(sector)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${preferences.preferredSectors.includes(sector)
                          ? 'bg-rh-green text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {sector}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-rh-green text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-gray-400 font-semibold"
              >
                {loading ? 'Analyzing Market...' : 'Get Recommendations'}
              </button>
            </form>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">AI Advisor Analysis</h2>
              {result ? (
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap">{result}</div>
                </div>
              ) : (
                <p className="text-gray-500 italic">Configure your profile to receive personalized advice.</p>
              )}
            </div>

            {/* Context / Top Picks Cards */}
            {context.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-rh-dark mb-4">Analyzed Startups (Context)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {context.map((startup, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg shadow border border-gray-100">
                      <h4 className="font-bold text-lg text-rh-blue">{startup.name}</h4>
                      <span className="inline-block bg-gray-100 text-xs px-2 py-1 rounded mt-1 mb-2">{startup.market}</span>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-3">{startup.description}</p>
                      <div className="text-xs text-gray-500 flex justify-between">
                        <span>Rev: {startup.revenue}</span>
                        <span>Fund: {startup.funding}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}