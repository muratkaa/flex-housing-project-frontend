/* eslint-disable @typescript-eslint/no-explicit-any */
import {  ReviewsView } from './views/ReviewsView';
import { syncReviews } from '@/services/api';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { AnalyticsView } from './views/AnalyticsView';

type TabType = 'reviews' | 'analytics';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('reviews');
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    try {
      setSyncing(true);
      await syncReviews();
      window.location.reload();

      alert('Sync successful!');
    } catch (error) {
      console.error('Sync failed', error);
      alert('Sync failed.');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Manager Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Overview of reviews and property performance.
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleSync} disabled={syncing}>
            {syncing ? 'Syncing...' : 'Sync Hostaway'}
          </Button>
        </div>
      </div>

      {/* TAB NAVIGATION */}
      <div className="border-b border-slate-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <TabButton
            isActive={activeTab === 'reviews'}
            onClick={() => setActiveTab('reviews')}
            label="Review Management"
          />
          <TabButton
            isActive={activeTab === 'analytics'}
            onClick={() => setActiveTab('analytics')}
            label="Analytics & Trends"
          />
        </nav>
      </div>

      {/* VIEW CONTAINER */}
      <div className="min-h-[500px]">
        {activeTab === 'reviews' ? (
          <ReviewsView />
        ) : (
          <AnalyticsView />
        )}
      </div>
    </div>
  );
}

// Helper: Tab Button
const TabButton = ({ isActive, onClick, label }: any) => (
  <button
    onClick={onClick}
    className={`
      whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
      ${isActive
        ? 'border-slate-900 text-slate-900'
        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
    `}
  >
    {label}
  </button>
);
