/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { ReviewList } from '@/components/ReviewList';
import { FilterBar } from '@/components/FilterBar';
import type { Review, ReviewFilter, PaginationMeta } from '@/types';

import { Button } from '@/components/ui/button';
import { getPaginatedReviews, updateReviewVisibility } from '@/services/api';

const ITEMS_PER_PAGE = 10;

export const ReviewsView: React.FC = () => {
  // --- STATE ---
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [filters, setFilters] = useState<ReviewFilter>({
    sortBy: 'date',
    sortOrder: 'desc'
  });

  // Pagination State
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: ITEMS_PER_PAGE,
    lastPage: 1
  });

  //Fetch data
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await getPaginatedReviews({
        ...filters,
        page: page,
        limit: ITEMS_PER_PAGE
      });

      setReviews(response.data);
      setMeta(response.meta);

    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [filters]);


  useEffect(() => {
    fetchReviews();
  }, [page, filters]);

  // --- VISIBILITY TOGGLE ---
  const handleToggleVisibility = async (id: number, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    setReviews(prev => prev.map(r => r.id === id ? { ...r, isVisible: newStatus } : r));
    try {
      await updateReviewVisibility(id, newStatus);
    } catch (e) {
      setReviews(prev => prev.map(r => r.id === id ? { ...r, isVisible: currentStatus } : r));
      alert('Failed to update status');
    }
  };

  // --- PAGINATION HANDLER ---
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= meta.lastPage) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">

        {/* HEADER */}
        <div className="mb-6">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-semibold text-slate-800">Review Management</h2>
            <span className="text-sm text-slate-500">
              Showing {reviews.length} of <strong>{meta.total}</strong> reviews
            </span>
          </div>
          <FilterBar filters={filters} onFilterChange={setFilters} />
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin mb-4"></div>
            <p>Loading reviews...</p>
          </div>
        ) : (
          <>
            <ReviewList
              reviews={reviews}
              onToggleVisibility={handleToggleVisibility}
            />

            {/* PAGINATION CONTROLS */}
            {meta.lastPage > 1 && (
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>

                <span className="text-sm font-medium text-slate-600">
                  Page {page} of {meta.lastPage}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === meta.lastPage}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};