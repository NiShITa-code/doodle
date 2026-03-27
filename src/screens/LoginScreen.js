import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { loginWithEmail, registerWithEmail } from '../lib/auth';

export default function LoginScreen({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !name)) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password, name);
      }
      onAuthSuccess();
    } catch (error) {
      Alert.alert('Authentication Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black justify-center items-center">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="w-full px-8 items-center">
        
        <View className="mb-12 items-center">
          <View className="w-24 h-24 bg-[#a7295a] rounded-full items-center justify-center mb-6 shadow-2xl">
            <MaterialIcons name="gesture" size={56} color="white" />
          </View>
          <Text className="text-4xl font-extrabold text-white tracking-tight">Doodle Bound</Text>
          <Text className="text-gray-400 font-medium text-lg mt-2 text-center max-w-[280px]">
            The Social Canvas for your Home Screen.
          </Text>
        </View>

        <View className="w-full max-w-sm space-y-4 mb-8">
          {!isLogin && (
            <TextInput
              className="bg-[#1e1e1e] border border-white/10 text-white rounded-2xl px-5 py-4 font-bold text-lg mb-4"
              placeholder="Your Name"
              placeholderTextColor="#666"
              value={name}
              onChangeText={setName}
            />
          )}

          <TextInput
            className="bg-[#1e1e1e] border border-white/10 text-white rounded-2xl px-5 py-4 font-bold text-lg mb-4"
            placeholder="Email Address"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            className="bg-[#1e1e1e] border border-white/10 text-white rounded-2xl px-5 py-4 font-bold text-lg mb-6"
            placeholder="Password"
            placeholderTextColor="#666"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity 
            onPress={handleSubmit} 
            disabled={loading}
            className="w-full py-4 rounded-full shadow-xl bg-white items-center justify-center flex-row gap-2"
          >
            {loading ? (
              <ActivityIndicator color="black" />
            ) : (
              <>
                <Text className="text-black font-extrabold text-xl">{isLogin ? 'Sign In' : 'Create Profile'}</Text>
                <MaterialIcons name="arrow-forward" size={24} color="black" />
              </>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)} className="py-2">
          <Text className="text-gray-400 font-bold text-base">
            {isLogin ? "Don't have an account? Create one." : "Already have an account? Sign in."}
          </Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
