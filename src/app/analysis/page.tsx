
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AnalysisPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    market: '',
    team: '',
    revenue: '',
    funding: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.analysis) {
        setResult(data.analysis);
      } else {
        alert('Failed to analyze startup');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-rh-light p-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => router.back()} className="mb-4 text-rh-blue hover:underline">
          &larr; Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-rh-dark mb-8">Startup Deep-Dive Analysis</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Startup Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Startup Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Market Sector</label>
                <input
                  type="text"
                  name="market"
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData.market}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Elevator Pitch / Description</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Team Usage</label>
                <input
                  type="text"
                  name="team"
                  className="w-full mt-1 p-2 border rounded-md"
                  placeholder="e.g. 2 ex-Google founders"
                  value={formData.team}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Revenue</label>
                <input
                  type="text"
                  name="revenue"
                  className="w-full mt-1 p-2 border rounded-md"
                  placeholder="e.g. $10k MRR"
                  value={formData.revenue}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Funding History</label>
                <input
                  type="text"
                  name="funding"
                  className="w-full mt-1 p-2 border rounded-md"
                  placeholder="e.g. Bootstrapped, Series A"
                  value={formData.funding}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-rh-blue text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-gray-400"
              >
                {loading ? 'Analyzing...' : 'Generate Analysis Report'}
              </button>
            </form>
          </div>

          {/* Results Display */}
          <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Gemini AI Insights</h2>
            {result ? (
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap">{result}</div>
              </div>
            ) : (
              <div className="text-gray-500 italic text-center py-12">
                Fill out the form to generate a comprehensive AI analysis of the startup.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}