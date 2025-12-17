/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import type { Review } from '../types';

export const useDashboardStats = (reviews: Review[]) => {
  const stats = useMemo(() => {
    if (!reviews.length) return null;

    //GENERAL SUMMARY
    const totalReviews = reviews.length;
    const averageRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews;

    //PER-PROPERTY PERFORMANCE

    const listingMap = reviews.reduce((acc, review) => {
      const name = review.listingName;
      if (!acc[name]) {
        acc[name] = { name, totalRating: 0, count: 0, lowScores: 0 };
      }
      acc[name].totalRating += review.rating;
      acc[name].count += 1;
      if (review.rating < 4) acc[name].lowScores += 1;
      return acc;
    }, {} as Record<string, any>);

    const propertyPerformance = Object.values(listingMap)
      .map((p) => ({
        name: p.name,
        avgRating: Number((p.totalRating / p.count).toFixed(1)),
        count: p.count,
        riskFactor: p.lowScores,
      }))
      .sort((a, b) => b.avgRating - a.avgRating);

    //TRENDS
    const monthlyData = reviews.reduce((acc, review) => {
      const date = new Date(review.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!acc[monthKey]) {
        acc[monthKey] = { date: monthKey, total: 0, count: 0 };
      }
      acc[monthKey].total += review.rating;
      acc[monthKey].count += 1;
      return acc;
    }, {} as Record<string, any>);

    const trendData = Object.values(monthlyData)
      .map((d) => ({
        date: d.date,
        rating: Number((d.total / d.count).toFixed(1)),
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      totalReviews,
      averageRating: averageRating.toFixed(1),
      propertyPerformance,
      trendData,
    };
  }, [reviews]);

  return stats;
};