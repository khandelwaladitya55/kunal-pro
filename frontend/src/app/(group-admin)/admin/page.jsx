import React from 'react'
import { FaUsers, FaChartBar, FaCog } from 'react-icons/fa';

export default function page() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <FaChartBar className="text-blue-500 text-3xl mb-4" />
          <h2 className="text-xl font-semibold">Sales</h2>
          <p className="text-gray-600">View and manage sales data.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <FaUsers className="text-green-500 text-3xl mb-4" />
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-gray-600">Manage users and their permissions.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <FaCog className="text-red-500 text-3xl mb-4" />
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="text-gray-600">Manage product listings and inventory.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <FaChartBar className="text-yellow-500 text-3xl mb-4" />
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-gray-600">Analyze revenue and financial data.</p>
        </div>
      </div>
    </div>
  )
}
