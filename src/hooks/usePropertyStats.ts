/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import type { Review } from '@/types';

export interface PropertyStat {
  id: string;
  name: string;
  avgRating: string;
  reviewCount: number;
  trendData: { date: string; rating: number }[];
  highlights: { category: string; score: string }[];
  issues: { category: string; score: string }[];
}

export const usePropertyStats = (reviews: Review[]) => {
  return useMemo(() => {
    if (!reviews.length) return [];

    //Group byu houses
    const groups: Record<string, Review[]> = {};
    reviews.forEach((r) => {
      if (!groups[r.listingName]) groups[r.listingName] = [];
      groups[r.listingName].push(r);
    });

    //Stats for each group
    const stats: PropertyStat[] = Object.keys(groups).map((listingName) => {
      const propertyReviews = groups[listingName];

      // General average
      const totalRating = propertyReviews.reduce((sum, r) => sum + r.rating, 0);
      const avgRating = (totalRating / propertyReviews.length).toFixed(1);

      // Trend
      const sortedReviews = [...propertyReviews].sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      const trendData = sortedReviews.slice(-10).map(r => ({
        date: new Date(r.date).toLocaleDateString(),
        rating: r.rating
      }));

      //Category
      const categoryMap: Record<string, { sum: number; count: number }> = {};

      propertyReviews.forEach((r) => {
        const cats = r.categories as any[] || [];
        cats.forEach((c: { category: string; rating: number }) => {
          if (!categoryMap[c.category]) {
            categoryMap[c.category] = { sum: 0, count: 0 };
          }

          let score = c.rating;
          if (score > 5) score = score / 2;

          categoryMap[c.category].sum += score;
          categoryMap[c.category].count += 1;
        });
      });

      const highlights: { category: string; score: string }[] = [];
      const issues: { category: string; score: string }[] = [];

      Object.entries(categoryMap).forEach(([cat, val]) => {
        const avg = val.sum / val.count;
        const formatted = avg.toFixed(1);

        if (avg > 4.5) {
          highlights.push({ category: cat, score: formatted });
        } else if (avg < 3.0) {
          issues.push({ category: cat, score: formatted });
        }
      });

      return {
        id: listingName,
        name: listingName,
        avgRating,
        reviewCount: propertyReviews.length,
        trendData,
        highlights,
        issues,
      };
    });

    return stats;
  }, [reviews]);
};