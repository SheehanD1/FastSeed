'use client';

import React, { useState, useEffect } from 'react';
import { Startup } from '../../types';

export default function AdminDashboard() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await fetch('/api/startups');
        if (!response.ok) {
          throw new Error('Failed to fetch startups');
        }
        const data = await response.json();
        setStartups(data);
      } catch (error) {
        console.error('Error fetching startups:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStartups();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/startups/${id}/approve`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to approve startup');
      }

      setStartups(prev =>
        prev.map(startup =>
          startup.id === id ? { ...startup, status: 'approved' } : startup
        )
      );
    } catch (error) {
      console.error('Error approving startup:', error);
      alert('Failed to approve startup. Please try again.');
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/startups/${id}/reject`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to reject startup');
      }

      setStartups(prev =>
        prev.map(startup =>
          startup.id === id ? { ...startup, status: 'rejected' } : startup
        )
      );
    } catch (error) {
      console.error('Error rejecting startup:', error);
      alert('Failed to reject startup. Please try again.');
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-xl text-gray-600">
            Manage startup submissions
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {startups.map((startup) => (
              <li key={startup.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900">
                      {startup.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {startup.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {startup.market}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {startup.stage}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        ${startup.fundingGoal.toLocaleString()} goal
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex space-x-4">
                    {startup.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(startup.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(startup.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {startup.status === 'approved' && (
                      <span className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600">
                        Approved
                      </span>
                    )}
                    {startup.status === 'rejected' && (
                      <span className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600">
                        Rejected
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 