import React, { useState } from 'react';

interface CreateStartupFormProps {
  onSubmit: (data: any) => void;
}

const CreateStartupForm: React.FC<CreateStartupFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pitchDeckLink: '',
    market: '',
    stage: 'pre-seed',
    fundingGoal: '',
    revenue: '',
    users: '',
    cac: '',
    churn: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          required
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="pitchDeckLink" className="block text-sm font-medium text-gray-700">
          Pitch Deck Link
        </label>
        <input
          type="url"
          name="pitchDeckLink"
          id="pitchDeckLink"
          required
          value={formData.pitchDeckLink}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="market" className="block text-sm font-medium text-gray-700">
          Market
        </label>
        <input
          type="text"
          name="market"
          id="market"
          required
          value={formData.market}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="stage" className="block text-sm font-medium text-gray-700">
          Stage
        </label>
        <select
          name="stage"
          id="stage"
          required
          value={formData.stage}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="pre-seed">Pre-seed</option>
          <option value="seed">Seed</option>
          <option value="series-a">Series A</option>
          <option value="series-b">Series B</option>
          <option value="series-c">Series C</option>
        </select>
      </div>

      <div>
        <label htmlFor="fundingGoal" className="block text-sm font-medium text-gray-700">
          Funding Goal ($)
        </label>
        <input
          type="number"
          name="fundingGoal"
          id="fundingGoal"
          required
          value={formData.fundingGoal}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="revenue" className="block text-sm font-medium text-gray-700">
          Monthly Revenue ($)
        </label>
        <input
          type="number"
          name="revenue"
          id="revenue"
          required
          value={formData.revenue}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="users" className="block text-sm font-medium text-gray-700">
          Number of Users
        </label>
        <input
          type="number"
          name="users"
          id="users"
          required
          value={formData.users}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="cac" className="block text-sm font-medium text-gray-700">
          Customer Acquisition Cost ($)
        </label>
        <input
          type="number"
          name="cac"
          id="cac"
          required
          value={formData.cac}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="churn" className="block text-sm font-medium text-gray-700">
          Monthly Churn Rate (%)
        </label>
        <input
          type="number"
          name="churn"
          id="churn"
          required
          step="0.01"
          value={formData.churn}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit Startup
      </button>
    </form>
  );
};

export default CreateStartupForm; 