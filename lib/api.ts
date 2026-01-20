import { supabase } from './supabase';

/**
 * PORTFOLIO API
 */
export const getPortfolioItems = async () => {
  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * REVIEWS API
 */
export const getApprovedReviews = async () => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const submitReview = async (review: {
  name: string;
  event_type: string;
  rating: number;
  message: string;
}) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([review]);

  if (error) throw error;
  return data;
};

/**
 * ENQUIRIES API
 */
export const submitEnquiry = async (enquiry: {
  name: string;
  phone: string;
  city: string;
  event_date: string;
  message: string;
  service?: string;
}) => {
  const { data, error } = await supabase
    .from('enquiries')
    .insert([enquiry]);

  if (error) throw error;
  return data;
};