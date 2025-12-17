import React, { useState, useEffect } from 'react';
import type { Review, ReviewFilter } from '@/types';
import { usePropertyStats } from '@/hooks/usePropertyStats';
import { PropertyCard } from '@/components/PropertyCard';
import { FilterBar } from '@/components/FilterBar';
import { Button } from '@/components/ui/button'; // Eğer button componentin varsa
import { getReviews } from '@/services/api';

const ITEMS_PER_PAGE = 9; // Her sayfada 9 kart (3x3 grid)

export const AnalyticsView: React.FC = () => {
  // --- STATE ---
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  // Filtreleme State'i
  const [filters, setFilters] = useState<ReviewFilter>({
    sortBy: 'date',
    sortOrder: 'desc'
  });

  // Pagination State'i
  const [currentPage, setCurrentPage] = useState(1);

  // --- DATA FETCHING ---
  const fetchReviews = async () => {
    setLoading(true);
    try {
      // Backend'den filtrelenmiş ham veriyi çekiyoruz
      const data = await getReviews(filters);
      setReviews(data);
      setCurrentPage(1); // Filtre değişirse 1. sayfaya dön
    } catch (error) {
      console.error('Failed to fetch analytics data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [filters]);

  // --- HESAPLAMALAR ---
  // 1. Ham veriyi evlere (PropertyStats) dönüştür
  const allStats = usePropertyStats(reviews);

  // 2. Client-Side Pagination Mantığı
  const totalPages = Math.ceil(allStats.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentStats = allStats.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // --- HANDLERS ---
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Sayfa değişince yukarı kaydır
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">

      {/* HEADER & FILTER */}
      <div className="mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-800">Property Performance</h2>
          <p className="text-slate-500 text-sm">
            Analyze trends and health scores across your portfolio.
          </p>
        </div>

        {/* FİLTRE BAR BURAYA GELDİ */}
        <FilterBar filters={filters} onFilterChange={setFilters} />
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center text-slate-400">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin mb-4"></div>
          <p>Analyzing property data...</p>
        </div>
      ) : allStats.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <p className="text-slate-500">No properties found matching criteria.</p>
        </div>
      ) : (
        <>
          {/* GRID LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentStats.map((stat) => (
              <PropertyCard key={stat.id} data={stat} />
            ))}
          </div>

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 py-4 border-t border-slate-100">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <span className="text-sm font-medium text-slate-600">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};