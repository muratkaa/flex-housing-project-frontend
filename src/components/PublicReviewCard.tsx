import React from 'react';
import { Star, User } from 'lucide-react';
import type { Review } from '@/types';

export const PublicReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="border-b border-slate-100 py-6 last:border-0">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar Placeholder */}
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <User size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">{review.guestName}</h4>
            <span className="text-xs text-slate-500">
              {new Date(review.date).toLocaleDateString('en-GB', {
                month: 'long', year: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="flex items-center gap-1 bg-slate-900 text-white px-2 py-1 rounded text-xs font-bold">
          <Star size={12} fill="currentColor" />
          <span>{review.rating}</span>
        </div>
      </div>

      <p className="text-slate-600 text-sm leading-relaxed">
        {review.content}
      </p>
    </div>
  );
};