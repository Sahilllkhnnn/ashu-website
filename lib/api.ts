
import { supabase } from './supabase';

const PORTFOLIO_BUCKET = 'portfolio';

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
  if (imageUrl) {
    try {
      const urlParts = imageUrl.split(`${PORTFOLIO_BUCKET}/`);
      if (urlParts.length > 1) {
        const path = urlParts[1].split('?')[0];
        await supabase.storage.from(PORTFOLIO_BUCKET).remove([path]);
      }
    } catch (e) {
      console.warn("Clean-up: Storage file already missing or inaccessible.");
    }
  }
  const { error } = await supabase.from('portfolio_items').delete().eq('id', id);
  if (error) throw error;
};

/**
 * REVIEWS API - INSTANT FEEDBACK
 */
export const getAllReviews = async () => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
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
    .insert([{ ...review, is_approved: true }]);
  if (error) throw error;
  return data;
};

export const deleteReview = async (id: string) => {
  const { error } = await supabase.from('reviews').delete().eq('id', id);
  if (error) throw error;
};

/**
 * ENQUIRIES API - REDUNDANT (MIGRATED TO DIRECT WHATSAPP)
 */
export const getEnquiries = async () => [];
export const deleteEnquiry = async (id: string) => {};
export const submitEnquiry = async (enquiry: any) => ({ data: [] });

/**
 * STORAGE API
 */
export const uploadPortfolioImage = async (file: File) => {
  const timestamp = Date.now();
  const cleanName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
  const filePath = `${timestamp}_${cleanName}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(PORTFOLIO_BUCKET)
    .upload(filePath, file, { cacheControl: '3600', upsert: false });

  if (uploadError) {
    if (uploadError.message.includes('Bucket not found')) {
      throw new Error(`Storage configuration error: Bucket "${PORTFOLIO_BUCKET}" must be created in Supabase.`);
    }
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from(PORTFOLIO_BUCKET)
    .getPublicUrl(filePath);

  return publicUrl;
};
