import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BarChart, LineChart } from '../../components/Charts';

const SellerDashboard = ({ signer }) => {
  const path = window.location.pathname;

 

  return (
    <div className="h-auto bg-gray-900 text-white pt-5">
      {/* Main Content Section */}
      <div className="grid grid-cols-4 gap-4 p-6">
        {/* Stats Cards */}
        <div className="col-span-3 grid grid-cols-3 gap-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h4 className="text-sm text-gray-400">Total Sales</h4>
            <h3 className="text-2xl font-bold">50.8K</h3>
            <p className="text-green-500">+24.8%</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h4 className="text-sm text-gray-400">Completed Sales</h4>
            <h3 className="text-2xl font-bold">50.8K</h3>
            <p className="text-green-500">+24.8%</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h4 className="text-sm text-gray-400">Pending Orders</h4>
            <h3 className="text-2xl font-bold">50.8K</h3>
            <p className="text-green-500">+24.8%</p>
          </div>
        </div>

        {/* Stats Overview and Chart */}
        <div className="col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h4 className="font-bold mb-4">Stats Overview</h4>
          <ul>
            <li className="flex justify-between items-center mb-2">
              <span>Rice</span>
              <span className="bg-orange-500 h-2 w-3/4 rounded-lg"></span>
              <span>83%</span>
            </li>
            <li className="flex justify-between items-center mb-2">
              <span>Millet</span>
              <span className="bg-orange-500 h-2 w-3/5 rounded-lg"></span>
              <span>74%</span>
            </li>
            <li className="flex justify-between items-center mb-2">
              <span>Corn</span>
              <span className="bg-orange-500 h-2 w-1/2 rounded-lg"></span>
              <span>53%</span>
            </li>
            <li className="flex justify-between items-center mb-2">
              <span>Ginger</span>
              <span className="bg-orange-500 h-2 w-1/3 rounded-lg"></span>
              <span>38%</span>
            </li>
          </ul>
        </div>

        {/* Graph Section with Chart.js */}
        <div className="col-span-4 grid grid-cols-2 gap-4">
          {/* First Graph Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h4 className="font-bold mb-4">Top Selling Commodities</h4>
            <div className="bg-gray-700 p-4 h-64 rounded-lg" style={{ width: '100%', height: '400px' }}>
              <BarChart />
            </div>
          </div>

          {/* Line Graph Card for Sales Trend */}
      <div className="col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h4 className="font-bold mb-4">Sales Trend (Last 30 Days)</h4>
        <div className="bg-gray-700 p-4 h-64 rounded-lg" style={{ width: '100%', height: '400px' }}>
          <LineChart />
        </div>
      </div>

        {/* Recent Orders Section */}
        <div className="col-span-4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h4 className="font-bold mb-4">Recent Orders</h4>
          <table className="w-full text-left table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Order</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="mb-2">
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">5:40am</td>
                <td className="px-4 py-2">Lorem ipsum dolor sit</td>
                <td className="px-4 py-2 bg-yellow-600 opacity-50 text-white rounded-full mb-3">Pending</td>
                <td className="px-4 py-2">$120.00</td>
                <td className="px-4 py-2">
                  <button className="text-red-500">Delete</button>
                </td>
              </tr>
              <tr className="space-y-2">
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">6:00am</td>
                <td className="px-4 py-2">Lorem ipsum dolor sit amet</td>
                <td className="px-4 py-2 bg-yellow-600 opacity-50  text-white rounded-full mb-3">Pending</td>
                <td className="px-4 py-2">$150.00</td>
                <td className="px-4 py-2">
                  <button className="text-red-500">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Outlet for dynamic content */}
      <main className="flex-1 p-6">
        <Outlet /> 
      </main>
    </div>
    </div>
  );
};

export default SellerDashboard;