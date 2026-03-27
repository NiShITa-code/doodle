import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabase';
import { getSession } from './auth';

const LOCAL_CANVAS_LIST_KEY = '@doodle_bound_canvases';

export const getMyCanvases = async () => {
  try {
    const session = await getSession();
    if (!session) return [];

    // Check local list of joined canvases
    const stored = await AsyncStorage.getItem(LOCAL_CANVAS_LIST_KEY);
    const canvasIds = stored ? JSON.parse(stored) : [];
    
    if (canvasIds.length === 0) return [];

    // Fetch the actual canvas details from Supabase
    const { data, error } = await supabase
      .from('canvases')
      .select('*')
      .in('id', canvasIds)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching canvases:", error);
      return [];
    }

    return data || [];
  } catch (e) {
    console.error("Error in getMyCanvases", e);
    return [];
  }
};

export const createNewCanvas = async (ownerName, type = 'group') => {
  try {
    const session = await getSession();
    if (!session) return null;

    const { data, error } = await supabase.from('canvases').insert([{
      owner_id: session.id, // We assume session.id maps to users.id
      name: `${ownerName}'s ${type === 'couple' ? 'Couple' : 'Group'} Canvas`,
      type: type,
      color: type === 'couple' ? '#ff4b82' : '#a7295a',
      beacon: null
    }]).select().single();

    if (error || !data) {
      console.error("Error creating Canvas:", error);
      return null;
    }

    // Save strictly the ID locally to know we are part of this room
    const stored = await AsyncStorage.getItem(LOCAL_CANVAS_LIST_KEY);
    const canvases = stored ? JSON.parse(stored) : [];
    await AsyncStorage.setItem(LOCAL_CANVAS_LIST_KEY, JSON.stringify([data.id, ...canvases]));
    
    return data;
  } catch (e) {
    console.error("Exception in createNewCanvas:", e);
    return null;
  }
};

export const joinCanvas = async (canvasId) => {
  try {
    const stored = await AsyncStorage.getItem(LOCAL_CANVAS_LIST_KEY);
    let canvases = stored ? JSON.parse(stored) : [];
    
    if (!canvases.includes(canvasId)) {
      canvases = [canvasId, ...canvases];
      await AsyncStorage.setItem(LOCAL_CANVAS_LIST_KEY, JSON.stringify(canvases));
    }

    // Verify it exists in DB
    const { data } = await supabase
      .from('canvases')
      .select('*')
      .eq('id', canvasId)
      .single();
      
    return data;
  } catch (e) {
    console.error("Exception in joinCanvas:", e);
    return null;
  }
};
