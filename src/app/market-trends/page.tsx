'use client';

import React, { useState } from 'react';
import { getMarketTrends } from '@/lib/gemini';

export default function MarketTrendsPage() {
  const [market, setMarket] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await getMarketTrends(market);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze market trends. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-rh-light py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-rh-dark mb-8 text-center">
          Market Trends Analysis
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-rh-dark mb-6">
              Enter Market Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-rh-dark mb-2">Market/Sector</label>
                <input
                  type="text"
                  value={market}
                  onChange={(e) => setMarket(e.target.value)}
                  placeholder="e.g., FinTech, Healthcare, AI"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rh-blue"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-rh-blue text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Analyzing...' : 'Analyze Market Trends'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-rh-dark mb-6">
              AI Analysis Results
            </h2>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            {analysis ? (
              <div className="prose max-w-none">
                {analysis.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-rh-gray">
                Enter a market or sector to get AI-powered trend analysis and
                insights.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 