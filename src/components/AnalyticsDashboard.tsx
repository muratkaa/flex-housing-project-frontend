import React from 'react';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from 'recharts';
import { useDashboardStats } from '../hooks/useDashboardStats';
import type { Review } from '../types';

interface Props {
  reviews: Review[];
}

export const AnalyticsDashboard: React.FC<Props> = ({ reviews }) => {
  const stats = useDashboardStats(reviews);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

      {/* --- KARTLAR: GENEL BAKIŞ --- */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-center">
        <h3 className="text-gray-500 text-sm font-medium uppercase">Overall Rating</h3>
        <div className="flex items-baseline mt-2">
          <span className="text-4xl font-bold text-gray-900">{stats.averageRating}</span>
          <span className="ml-2 text-sm text-gray-500">/ 5.0</span>
        </div>
        <p className="text-sm text-gray-400 mt-2">Based on {stats.totalReviews} reviews</p>
      </div>

      {/* --- GRAFİK: TREND ANALİZİ --- */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-gray-700 font-semibold mb-4">Rating Trend (Last Months)</h3>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{fontSize: 12}} />
              <YAxis domain={[0, 5]} hide />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#4F46E5"
                strokeWidth={2}
                dot={{r: 4}}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- TABLO: PER-PROPERTY PERFORMANCE --- */}
      <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 bg-gray-50">
          <h3 className="text-gray-700 font-semibold">Property Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase font-medium text-gray-500">
              <tr>
                <th className="px-6 py-3">Listing Name</th>
                <th className="px-6 py-3">Reviews</th>
                <th className="px-6 py-3">Avg Rating</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.propertyPerformance.map((prop) => (
                <tr key={prop.name} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">{prop.name}</td>
                  <td className="px-6 py-3">{prop.count}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      prop.avgRating >= 4.5 ? 'bg-green-100 text-green-700' :
                      prop.avgRating >= 4.0 ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {prop.avgRating}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    {prop.riskFactor > 0 ? (
                      <span className="text-red-500 text-xs flex items-center">
                        ⚠️ {prop.riskFactor} Low Scores
                      </span>
                    ) : (
                      <span className="text-green-500 text-xs">Performing Well</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};