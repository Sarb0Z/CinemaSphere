import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

const getUser = async (id) => {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .is('id', id);
  if (error) {
    console.log(error);
    return null;
  }
  return data;
};

const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select();
  if (error) {
    console.log(error);
    return null;
  }
  return data;
};

const updateUser = async (id, data) => {
  const { error } = await supabase
    .from('profiles')
    .update(data)
    .eq('id', id);
  if (error) {
    console.log(error);
    return null;
  }
  return 'updated!!';
};

export { getUser, getAllUsers, updateUser };
