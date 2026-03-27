import { supabase } from './supabase';

// Real Supabase Authentication wrappers

export const getSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    // Return a normalized session object our app expects
    return {
      id: session.user.id,
      name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
      email: session.user.email,
    };
  }
  return null;
};

export const loginWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const registerWithEmail = async (email, password, name) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  });
  
  if (error) throw error;

  // IMPORTANT: Insert them into the public.users table so Foreign Keys (like the canvases owner_id) succeed!
  if (data?.user) {
    await supabase.from('users').upsert({
      id: data.user.id,
      device_id: data.user.id, // satisfying unique constraint
      name: name || email.split('@')[0],
      created_at: new Date().toISOString()
    });
  }

  return data;
};

export const logout = async () => {
  await supabase.auth.signOut();
};
