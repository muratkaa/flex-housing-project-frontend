/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import type { ReviewFilter } from '@/types';

interface FilterBarProps {
  filters: ReviewFilter;
  onFilterChange: (newFilters: ReviewFilter) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {

  const [searchTerm, setSearchTerm] = useState(filters.listingName || '');

  //debounce for search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== filters.listingName) {
        onFilterChange({ ...filters, listingName: searchTerm });
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // generic handler to update simple key-value pairs in the filter object
  const handleDirectChange = (key: keyof ReviewFilter, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  // Handler for the "Smart Sort" dropdown
  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-');
    onFilterChange({
      ...filters,
      sortBy: sortBy as any,
      sortOrder: sortOrder as any
    });
  };

  return (
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6 flex flex-wrap gap-4 items-end">

      {/*Search List*/}
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

      {/* Channel Filter */}
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

      {/*  Rating Filter  */}
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

      {/* Smart Sort */}
      <div className="flex flex-col gap-1.5 w-full md:w-48">
        <label className="text-xs font-semibold text-slate-500 uppercase">Sort Order</label>
        <select
          className="border border-slate-300 rounded px-3 py-2 text-sm bg-white focus:outline-none font-medium text-slate-700"
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