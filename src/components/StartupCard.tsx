import React from 'react';
import { Startup } from '../types';

interface StartupCardProps {
  startup: Startup;
}

const StartupCard: React.FC<StartupCardProps> = ({ startup }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {startup.name}
            </h3>
            <p className="text-gray-600 mb-4">{startup.description}</p>
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

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {startup.market}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {startup.stage}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Funding Goal</p>
            <p className="font-medium">${startup.fundingGoal.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Monthly Revenue</p>
            <p className="font-medium">${startup.revenue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Users</p>
            <p className="font-medium">{startup.users.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500">CAC</p>
            <p className="font-medium">${startup.cac.toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-6">
          <a
            href={startup.pitchDeckLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Pitch Deck
          </a>
        </div>
      </div>
    </div>
  );
};

export default StartupCard; 