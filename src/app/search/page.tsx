
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchResult {
    name: string;
    description: string;
    market: string;
    revenue: string;
    similarity?: number;
}

export default function SearchPage() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query }),
            });
            const data = await response.json();
            setResults(data.results || []);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-rh-light p-8">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => router.back()} className="mb-4 text-rh-blue hover:underline">
                    &larr; Back to Dashboard
                </button>

                <h1 className="text-3xl font-bold text-rh-dark mb-8">Data-Driven Startup Search</h1>

                <form onSubmit={handleSearch} className="mb-12">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full p-4 pl-12 rounded-xl shadow-lg border-none text-lg focus:ring-2 focus:ring-rh-blue"
                            placeholder="Describe what you are looking for (e.g., 'Eco-friendly sustainable energy solutions')..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <svg
                            className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <button
                            type="submit"
                            disabled={loading}
                            className="absolute right-2 top-2 bottom-2 bg-rh-blue text-white px-6 rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-gray-300"
                        >
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                </form>

                <div className="space-y-6">
                    {results.length > 0 ? (
                        results.map((startup, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-rh-dark">{startup.name}</h3>
                                    {startup.similarity && (
                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                            {(startup.similarity * 100).toFixed(1)}% Match
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                                    <span className="bg-gray-100 px-2 py-0.5 rounded">{startup.market}</span>
                                    <span>{startup.revenue}</span>
                                </div>
                                <p className="text-gray-700">{startup.description}</p>
                            </div>
                        ))
                    ) : (
                        !loading && query && (
                            <p className="text-center text-gray-500">No results found matching your criteria.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
