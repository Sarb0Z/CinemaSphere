import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

const getReview = async (id) => {
  const { data, error } = await supabase
    .from('reviews')
    .select()
    .is('id', id);
  if (error) {
    console.log(error);
    return null;
  }
  return data;
};

const getAllReviews = async () => {
  const { data, error } = await supabase
    .from('reviews')
    .select();
  if (error) {
    console.log(error);
    return null;
  }
  return data;
};

const createReview = async (data) => {
  const { error } = await supabase
    .from('reviews')
    .insert(data);
  if (error) {
    console.log(error);
    return null;
  }
  return 'created!!';
};

const updateReview = async (id, data) => {
  const { error } = await supabase
    .from('reviews')
    .update(data)
    .eq('id', id);
  if (error) {
    console.log(error);
    return null;
  }
  return 'updated!!';
};

const deleteReview = async (id) => {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);
  if (error) {
    console.log(error);
    return null;
  }
  return 'deleted!!';
};

export { getReview, getAllReviews, createReview, updateReview, deleteReview };
