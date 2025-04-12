import React from 'react';
import { Startup } from '../types';

interface LeaderboardProps {
  startups: Startup[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ startups }) => {
  // Sort startups by success score
  const sortedStartups = [...startups].sort((a, b) => b.successScore - a.successScore);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Top Startups</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {sortedStartups.slice(0, 5).map((startup, index) => (
          <div key={startup.id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-gray-500 font-medium mr-4">{index + 1}</span>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{startup.name}</h3>
                  <p className="text-sm text-gray-500">{startup.market}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${startup.successScore}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {startup.successScore}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard; 