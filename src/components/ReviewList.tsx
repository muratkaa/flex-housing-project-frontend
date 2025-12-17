import React from 'react';
import type { Review } from '@/types';

interface ReviewListProps {
  reviews: Review[];
  onToggleVisibility: (id: number, currentStatus: boolean) => void;
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews, onToggleVisibility }) => {

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
        <p className="text-slate-500">No reviews found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
          <tr>
            <th className="px-6 py-4 rounded-tl-lg">Listing</th>
            <th className="px-6 py-4">Guest</th>
            <th className="px-6 py-4">Rating</th>
            <th className="px-6 py-4">Channel</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4 text-center">Public?</th>
            <th className="px-6 py-4 rounded-tr-lg">Comment</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 border-t border-slate-100">
          {reviews.map((review) => (
            <tr key={review.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-900">{review.listingName}</td>
              <td className="px-6 py-4">{review.guestName}</td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getRatingColor(review.rating)}`}>
                  {review.rating}
                </span>
              </td>
              <td className="px-6 py-4 capitalize">{review.channel}</td>
              <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                {new Date(review.date).toLocaleDateString('en-GB')}
              </td>

              {/* VISIBILITY TOGGLE SWITCH */}
              <td className="px-6 py-4 text-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={review.isVisible}
                    onChange={() => onToggleVisibility(review.id, review.isVisible)}
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </td>

              <td className="px-6 py-4 max-w-xs">
                <p className="truncate text-slate-500" title={review.content}>{review.content}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function getRatingColor(rating: number) {
  if (rating >= 4.5) return 'bg-green-100 text-green-700';
  if (rating >= 4.0) return 'bg-blue-100 text-blue-700';
  if (rating >= 3.0) return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
}