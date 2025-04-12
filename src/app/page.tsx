import React from 'react'
import StartupTicker from './components/StartupTicker'

export default function Home() {
  return (
    <div className="min-h-screen bg-rh-light">
      <StartupTicker />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-rh-dark mb-4">
            Startup Investment Platform
          </h1>
          <p className="text-xl text-rh-gray mb-8 max-w-2xl mx-auto">
            Discover and invest in the next generation of innovative startups
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-rh-blue bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-rh-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-rh-dark mb-2">For Startups</h2>
            <p className="text-rh-gray mb-4">Create your profile and showcase your business to potential investors</p>
            <button className="bg-rh-blue text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
              Get Started
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-rh-green bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-rh-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-rh-dark mb-2">For Investors</h2>
            <p className="text-rh-gray mb-4">Discover and invest in promising startups with high growth potential</p>
            <button className="bg-rh-green text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
              Browse Startups
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-500 bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-rh-dark mb-2">AI-Powered</h2>
            <p className="text-rh-gray mb-4">Get data-driven insights on startup success probability</p>
            <button className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-rh-dark mb-4">Ready to Get Started?</h2>
          <p className="text-rh-gray mb-8 max-w-2xl mx-auto">
            Join our platform today and be part of the future of startup investing
          </p>
          <button className="bg-rh-dark text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors text-lg">
            Sign Up Now
          </button>
        </div>
      </main>
    </div>
  )
} 