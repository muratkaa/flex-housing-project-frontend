export interface ReviewCategory {
  category: string;
  rating: number;
}

export interface Review {
  id: number;
  hostawayId: number;
  listingName: string;
  guestName: string;
  rating: number;
  content: string;
  channel: string;
  type: string;
  date: string;
  isVisible: boolean;
  categories: ReviewCategory[];
}

export interface ReviewFilter {
  listingName?: string;
  minRating?: number;
  channel?: string;
  sortBy?: 'date' | 'rating';
  sortOrder?: 'asc' | 'desc';
  isVisible?: boolean;
}