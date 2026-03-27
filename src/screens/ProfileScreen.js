import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import { getSession, logout } from '../lib/auth';
import { getMyCanvases } from '../lib/canvases';

export default function ProfileScreen() {
  const [session, setSession] = useState(null);
  const [canvases, setCanvases] = useState([]);
  const [newName, setNewName] = useState('');
  const [saving, setSaving] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const init = async () => {
      const user = await getSession();
      setSession(user);
      if (user) setNewName(user.name);
      
      const myCanvases = await getMyCanvases();
      setCanvases(myCanvases);
    };
    init();
  }, []);

  const handleUpdateProfile = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    try {
      // Update Auth Metadata
      await supabase.auth.updateUser({ data: { name: newName } });
      // Update Public Users Table
      await supabase.from('users').update({ name: newName }).eq('id', session.id);
      Alert.alert('Success', 'Profile updated!');
    } catch (e) {
      Alert.alert('Error', 'Failed to update profile.');
    }
    setSaving(false);
  };

  const handleLeaveCanvas = (canvasId, name) => {
    Alert.alert('Leave Canvas', `Are you sure you want to permanently leave ${name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Leave', style: 'destructive', onPress: async () => {
          // Because we manage local memberships right now purely via the AsyncStorage key array or DB mapping, 
          // a full implementation deletes the relationship. For now we will wipe it from AsyncStorage.
          const AsyncStorage = require('@react-native-async-storage/async-storage').default;
          const stored = await AsyncStorage.getItem('@doodle_bound_canvases');
          let joinedC = stored ? JSON.parse(stored) : [];
          joinedC = joinedC.filter(id => id !== canvasId);
          await AsyncStorage.setItem('@doodle_bound_canvases', JSON.stringify(joinedC));
          
          setCanvases(prev => prev.filter(c => c.id !== canvasId));
      }}
    ]);
  };

  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: async () => {
          await logout();
          // Navigation auto-handles via App.js auth listener
      }}
    ]);
  };

  if (!session) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size="large" color="#a7295a" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row items-center px-6 py-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 bg-white/10 rounded-full items-center justify-center border border-white/20">
          <MaterialIcons name="chevron-left" size={28} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-extrabold text-2xl ml-4 tracking-tight">Your Profile</Text>
      </View>

      <ScrollView className="flex-1 px-6">
        <View className="items-center mt-6 mb-10">
          <View className="w-28 h-28 bg-[#a7295a] rounded-full items-center justify-center shadow-lg border-4 border-white/10 relative">
            <Text className="text-4xl text-white font-black">{session.name.substring(0, 1).toUpperCase()}</Text>
            <TouchableOpacity className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full items-center justify-center shadow-sm">
              <MaterialIcons name="edit" size={16} color="black" />
            </TouchableOpacity>
          </View>
          <Text className="text-gray-400 mt-4 font-medium">{session.email}</Text>
        </View>

        <View className="bg-[#1e1e1e] rounded-3xl p-5 mb-8 border border-white/5 shadow-xl">
          <Text className="text-gray-400 font-bold mb-3 uppercase tracking-wider text-xs">Display Name</Text>
          <View className="flex-row items-center gap-3">
             <TextInput
               className="flex-1 text-white font-bold text-lg border-b border-white/20 pb-2"
               value={newName}
               onChangeText={setNewName}
             />
             <TouchableOpacity onPress={handleUpdateProfile} disabled={saving} className="bg-white px-5 py-2.5 rounded-full shadow-sm">
               {saving ? <ActivityIndicator size="small" color="black" /> : <Text className="text-black font-extrabold text-sm">Save</Text>}
             </TouchableOpacity>
          </View>
        </View>

        <Text className="text-white font-extrabold text-xl mb-4 tracking-tight px-2">Your Canvases</Text>
        <View className="bg-[#1e1e1e] rounded-3xl p-2 mb-10 border border-white/5 shadow-xl">
          {canvases.length === 0 ? (
            <Text className="text-gray-500 font-medium py-6 text-center">You haven't joined any rooms.</Text>
          ) : (
            canvases.map((canvas, idx) => (
              <View key={canvas.id} className={`flex-row justify-between items-center p-4 ${idx !== canvases.length - 1 ? 'border-b border-white/5' : ''}`}>
                <View className="flex-row items-center gap-3 flex-1">
                  <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: canvas.color || '#a7295a' }}>
                     <MaterialIcons name={canvas.type === 'couple' ? 'favorite' : 'groups'} size={18} color="white" />
                  </View>
                  <View className="flex-1 pr-4">
                    <Text className="text-white font-bold text-base" numberOfLines={1}>{canvas.name}</Text>
                    <Text className="text-gray-500 font-medium text-xs">{new Date(canvas.created_at).toLocaleDateString()}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleLeaveCanvas(canvas.id, canvas.name)} className="w-9 h-9 bg-red-500/10 rounded-full items-center justify-center">
                  <MaterialIcons name="exit-to-app" size={18} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        <TouchableOpacity onPress={handleSignOut} className="w-full bg-red-500/10 py-4 rounded-full border border-red-500/20 items-center justify-center mb-10 flex-row gap-2">
           <MaterialIcons name="logout" size={20} color="#ef4444" />
           <Text className="text-red-500 font-extrabold text-lg">Log Out Securely</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
