import { supabase } from './supabase';

/**
 * PORTFOLIO API
 */
export const getPortfolioItems = async (showInactive = false) => {
  let query = supabase.from('portfolio_items').select('*');
  if (!showInactive) {
    query = query.eq('is_active', true);
  }
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createPortfolioItem = async (item: { 
  title: string; 
  category: string; 
  image_url: string; 
  description?: string 
}) => {
  const { data, error } = await supabase.from('portfolio_items').insert([item]).select();
  if (error) throw error;
  return data[0];
};

export const updatePortfolioItem = async (id: string, updates: any) => {
  const { error } = await supabase.from('portfolio_items').update(updates).eq('id', id);
  if (error) throw error;
};

export const deletePortfolioItem = async (id: string, imageUrl: string) => {
  // 1. Delete from storage if it exists
  if (imageUrl) {
    const path = imageUrl.split('/').pop();
    if (path) {
      await supabase.storage.from('portfolio').remove([path]);
    }
  }
  // 2. Delete from DB
  const { error } = await supabase.from('portfolio_items').delete().eq('id', id);
  if (error) throw error;
};

/**
 * REVIEWS API
 */
export const getAllReviews = async () => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

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

export const approveReview = async (id: string) => {
  const { error } = await supabase.from('reviews').update({ is_approved: true }).eq('id', id);
  if (error) throw error;
};

export const deleteReview = async (id: string) => {
  const { error } = await supabase.from('reviews').delete().eq('id', id);
  if (error) throw error;
};

/**
 * ENQUIRIES API
 */
export const getEnquiries = async () => {
  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

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

export const deleteEnquiry = async (id: string) => {
  const { error } = await supabase.from('enquiries').delete().eq('id', id);
  if (error) throw error;
};

/**
 * STORAGE API
 */
export const uploadPortfolioImage = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('portfolio')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from('portfolio').getPublicUrl(filePath);
  return data.publicUrl;
};