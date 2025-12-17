import axios from 'axios';
import type { Review, ReviewFilter } from '../types';
import { ENV_VAR } from '../config';
import { removeEmptyParams } from '@/lib/utils';

const API_URL = ENV_VAR.BACKEND_BASE_URL;

export const api = axios.create({
  baseURL: API_URL,
});


//get reviews api call
export const getReviews = async (params: ReviewFilter = {}) => {
  const cleanParams = removeEmptyParams(params);

  const { data } = await api.get<Review[]>('/reviews', { params: cleanParams });
  return data;
};

//update reviews visibility api call
export const updateReviewVisibility = async (id: number, isVisible: boolean) => {
  const { data } = await api.patch(`/reviews/${id}/visibility`, { isVisible });
  return data;
};

//sync for developing purposes, i ve explained in backend codes comment
export const syncReviews = async () => {
  const { data } = await api.get<{ status: string; message: string }>('/reviews/sync');
  return data;
};