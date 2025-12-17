/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import type { Review } from '@/types';

export interface PropertyStat {
  id: string; // Listing name'i ID olarak kullanacağız
  name: string;
  avgRating: string; // "4.8"
  reviewCount: number;
  trendData: { date: string; rating: number }[]; // Grafik verisi
  highlights: { category: string; score: string }[]; // > 4.5
  issues: { category: string; score: string }[];     // < 3.0
}

export const usePropertyStats = (reviews: Review[]) => {
  return useMemo(() => {
    if (!reviews.length) return [];

    // 1. Mülklere Göre Grupla
    const groups: Record<string, Review[]> = {};
    reviews.forEach((r) => {
      if (!groups[r.listingName]) groups[r.listingName] = [];
      groups[r.listingName].push(r);
    });

    // 2. Her Grup İçin İstatistik Çıkar
    const stats: PropertyStat[] = Object.keys(groups).map((listingName) => {
      const propertyReviews = groups[listingName];

      // --- A. GENEL ORTALAMA ---
      const totalRating = propertyReviews.reduce((sum, r) => sum + r.rating, 0);
      const avgRating = (totalRating / propertyReviews.length).toFixed(1);

      // --- B. TREND DATASI (Aylık Ortalama) ---
      // Tarihe göre sırala
      const sortedReviews = [...propertyReviews].sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      // Basitleştirilmiş trend: Her yorumu grafik noktası yap (veya aylık grupla)
      // Sparkline için son 10 yorum yeterli
      const trendData = sortedReviews.slice(-10).map(r => ({
        date: new Date(r.date).toLocaleDateString(),
        rating: r.rating
      }));

      // --- C. KATEGORİ ANALİZİ ---
      const categoryMap: Record<string, { sum: number; count: number }> = {};

      propertyReviews.forEach((r) => {
        // Mock datada categories array geliyor mu kontrol et
        const cats = r.categories as any[] || [];
        cats.forEach((c: { category: string; rating: number }) => {
          if (!categoryMap[c.category]) {
            categoryMap[c.category] = { sum: 0, count: 0 };
          }

          // EĞER PUAN 10 ÜZERİNDENSE 5'LİĞE ÇEVİR
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