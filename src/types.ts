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

export interface PaginationMeta {
  total: number;
  page: number;
  lastPage: number;
  limit: number;
}

export interface PaginatedResponse {
  data: Review[];
  meta: PaginationMeta;
}