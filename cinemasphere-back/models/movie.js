import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

const getMovie = async (id) => {
  const { data, error } = await supabase
    .from('movies')
    .select()
    .is('id', id);
  if (error) {
    console.log(error);
    return null;
  }
  return data;
};

const getAllMovies = async () => {
  const { data, error } = await supabase
    .from('movies')
    .select();
  if (error) {
    console.log(error);
    return null;
  }
  return data;
};

const createMovie = async (data) => {
  const { error } = await supabase
    .from('movies')
    .insert(data);
  if (error) {
    console.log(error);
    return null;
  }
  return 'created!!';
};

const updateMovie = async (id, data) => {
  const { error } = await supabase
    .from('movies')
    .update(data)
    .eq('id', id);
  if (error) {
    console.log(error);
    return null;
  }
  return 'updated!!';
};

const deleteMovie = async (id) => {
  const { error } = await supabase
    .from('movies')
    .delete()
    .eq('id', id);
  if (error) {
    console.log(error);
    return null;
  }
  return 'deleted!!';
};

export { getMovie, getAllMovies, createMovie, updateMovie, deleteMovie };
