import axios from 'axios';
import type { Review, ReviewFilter } from '../types';

// Backend adresimiz (NestJS varsayılan portu 3000)
const API_URL = 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
});

export const getReviews = async (params?: ReviewFilter) => {
  // Parametreleri temizle (undefined olanları gönderme)
  const cleanParams = Object.fromEntries(
    Object.entries(params || {}).filter(([, v]) => v != null && v !== '')
  );

  const response = await api.get<Review[]>('/reviews', { params: cleanParams });
  return response.data;
};

export const updateReviewVisibility = async (id: number, isVisible: boolean) => {
  const response = await api.patch(`/reviews/${id}/visibility`, { isVisible });
  return response.data;
};

export const syncReviews = async () => {
  const response = await api.post('/reviews/sync');
  return response.data;
};