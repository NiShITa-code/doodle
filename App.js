import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { ActivityIndicator, View } from 'react-native';
import { supabase } from './src/lib/supabase';

import LoginScreen from './src/screens/LoginScreen';
import SwipeableCanvasScreen from './src/screens/SwipeableCanvasScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import WalkthroughScreen from './src/screens/WalkthroughScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import './global.css';

const Stack = createNativeStackNavigator();

const prefix = Linking.createURL('/');

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  // Setup Deep Linking logic
  const linking = {
    prefixes: [prefix, 'doodlebound://'],
    config: {
      screens: {
        MainCanvas: 'invite/:canvasId',
      },
    },
  };

  useEffect(() => {
    const initializeApp = async () => {
      // Check if they've seen the onboarding
      const seenWalkthrough = await AsyncStorage.getItem('@doodle_bound_seen_onboarding');
      if (!seenWalkthrough) {
        setIsFirstLaunch(true);
      }

      // Check active session on boot
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (session?.user) {
        import('./src/lib/notifications').then(m => m.registerForPushNotificationsAsync(session.user.id));
      }

      setLoading(false);
    };

    initializeApp();

    // Listen for Auth changes dynamically
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
         import('./src/lib/notifications').then(m => m.registerForPushNotificationsAsync(newSession.user.id));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#a7295a" />
      </View>
    );
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        
        {isFirstLaunch && !session && (
          <Stack.Screen name="Walkthrough" component={WalkthroughScreen} />
        )}
        
        {!session ? (
          <Stack.Screen name="Login" options={{ animation: 'slide_from_right' }}>
            {(props) => <LoginScreen {...props} onAuthSuccess={() => setSession(true)} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="MainCanvas" component={SwipeableCanvasScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ animation: 'slide_from_bottom' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
