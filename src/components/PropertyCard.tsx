import type { PropertyStat } from '@/hooks/usePropertyStats';
import React from 'react';
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';


interface Props {
  data: PropertyStat;
}

export const PropertyCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col h-full hover:shadow-md transition-shadow">

      {/* HEADER  */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-slate-900 line-clamp-1" title={data.name}>
            {data.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1">{data.reviewCount} Reviews Total</p>
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-2xl font-bold ${getRatingColor(Number(data.avgRating))}`}>
            {data.avgRating}
          </span>
        </div>
      </div>

      {/* GRAPH: Micro Trend (Sparkline) */}
      <div className="h-16 mb-4 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.trendData}>
            <Tooltip
              contentStyle={{ fontSize: '12px', padding: '4px' }}
              itemStyle={{ padding: 0 }}
              labelStyle={{ display: 'none' }}
            />
            <Line
              type="monotone"
              dataKey="rating"
              stroke={Number(data.avgRating) >= 4 ? "#10B981" : "#F59E0B"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* INSIGHTS */}
      <div className="mt-auto space-y-3">

        {/* NEGATIVE (ISSUES) */}
        {data.issues.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              ⚠️ Attention Needed
            </p>
            <div className="flex flex-wrap gap-1.5">
              {data.issues.map((item) => (
                <span key={item.category} className="inline-flex items-center px-2 py-1 rounded bg-red-50 border border-red-100 text-xs text-red-700">
                  <span className="capitalize mr-1">{item.category}:</span>
                  <strong>{item.score}</strong>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* POSITIVE (HIGHLIGHTS) */}
        {data.highlights.length > 0 ? (
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              🏆 Top Features
            </p>
            <div className="flex flex-wrap gap-1.5">
              {data.highlights.slice(0, 3).map((item) => (
                <span key={item.category} className="inline-flex items-center px-2 py-1 rounded bg-green-50 border border-green-100 text-xs text-green-700">
                  <span className="capitalize mr-1">{item.category}:</span>
                  <strong>{item.score}</strong>
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-400 italic">No specific highlights yet.</div>
        )}

      </div>
    </div>
  );
};


function getRatingColor(rating: number) {
  if (rating >= 4.5) return 'text-green-600';
  if (rating >= 3.0) return 'text-yellow-600';
  return 'text-red-600';
}