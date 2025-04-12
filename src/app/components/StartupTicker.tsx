import React from 'react';

const mockStartups = [
  { name: 'TechFlow', change: '+12.5%', price: '$1.2M', trend: 'up' },
  { name: 'GreenEnergy', change: '+8.3%', price: '$850K', trend: 'up' },
  { name: 'HealthAI', change: '+15.7%', price: '$2.1M', trend: 'up' },
  { name: 'EduTech', change: '+5.2%', price: '$1.5M', trend: 'up' },
  { name: 'FoodTech', change: '+9.8%', price: '$950K', trend: 'up' },
  { name: 'FinTech', change: '+11.3%', price: '$1.8M', trend: 'up' },
  { name: 'CleanTech', change: '+7.6%', price: '$1.1M', trend: 'up' },
  { name: 'SpaceTech', change: '+14.2%', price: '$2.5M', trend: 'up' },
];

export default function StartupTicker() {
  return (
    <div className="bg-rh-dark text-white py-2 overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...mockStartups, ...mockStartups].map((startup, index) => (
          <div key={index} className="flex items-center mx-4">
            <span className="font-semibold mr-2">{startup.name}</span>
            <span className={`text-${startup.trend === 'up' ? 'rh-green' : 'rh-red'} mr-2`}>
              {startup.change}
            </span>
            <span className="text-gray-400">{startup.price}</span>
            <div className="w-4 h-4 ml-2">
              {startup.trend === 'up' ? (
                <svg viewBox="0 0 24 24" fill="none" className="text-rh-green">
                  <path d="M12 4L20 12H4L12 4Z" fill="currentColor" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" className="text-rh-red">
                  <path d="M12 20L4 12H20L12 20Z" fill="currentColor" />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 