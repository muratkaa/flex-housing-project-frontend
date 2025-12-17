/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import type { ReviewFilter } from '@/types';

interface FilterBarProps {
  filters: ReviewFilter;
  onFilterChange: (newFilters: ReviewFilter) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState(filters.listingName || '');

  // Debounce (300ms) - Mevcut kodun
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== filters.listingName) {
        onFilterChange({ ...filters, listingName: searchTerm });
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleDirectChange = (key: keyof ReviewFilter, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  // --- YENİ: SMART SORT HANDLER ---
  // Tek dropdown'dan gelen değeri parçalayıp Backend'e uygun hale getirir
  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-'); // 'rating-desc' -> sortBy='rating', sortOrder='desc'
    onFilterChange({
      ...filters,
      sortBy: sortBy as any,
      sortOrder: sortOrder as any
    });
  };

  return (
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6 flex flex-wrap gap-4 items-end">

      {/* 1. SEARCH */}
      <div className="flex flex-col gap-1.5 w-full md:w-auto md:flex-1">
        <label className="text-xs font-semibold text-slate-500 uppercase">Search Listing</label>
        <input
          type="text"
          placeholder="Search by listing name..."
          className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 2. CHANNEL */}
      <div className="flex flex-col gap-1.5 w-1/2 md:w-32">
        <label className="text-xs font-semibold text-slate-500 uppercase">Channel</label>
        <select
          className="border border-slate-300 rounded px-3 py-2 text-sm bg-white focus:outline-none"
          value={filters.channel || ''}
          onChange={(e) => handleDirectChange('channel', e.target.value)}
        >
          <option value="">All</option>
          <option value="airbnb">Airbnb</option>
          <option value="booking.com">Booking.com</option>
          <option value="vrbo">Vrbo</option>
          <option value="direct">Direct</option>
        </select>
      </div>

      {/* 3. RATING FILTER */}
      <div className="flex flex-col gap-1.5 w-1/3 md:w-28">
        <label className="text-xs font-semibold text-slate-500 uppercase">Min Stars</label>
        <select
          className="border border-slate-300 rounded px-3 py-2 text-sm bg-white focus:outline-none"
          value={filters.minRating || ''}
          onChange={(e) => handleDirectChange('minRating', e.target.value ? Number(e.target.value) : undefined)}
        >
          <option value="">Any</option>
          <option value="5">5 Only</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
        </select>
      </div>

      {/* 4. SMART SORT (YENİ VE GELİŞMİŞ) */}
      <div className="flex flex-col gap-1.5 w-full md:w-48">
        <label className="text-xs font-semibold text-slate-500 uppercase">Sort Order</label>
        <select
          className="border border-slate-300 rounded px-3 py-2 text-sm bg-white focus:outline-none font-medium text-slate-700"
          // Mevcut state'i birleştirerek value oluşturuyoruz
          value={`${filters.sortBy || 'date'}-${filters.sortOrder || 'desc'}`}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <optgroup label="Time">
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
          </optgroup>
          <optgroup label="Rating Score">
            <option value="rating-desc">Highest Rated First </option>
            <option value="rating-asc">Lowest Rated First </option>
          </optgroup>
        </select>
      </div>

    </div>
  );
};