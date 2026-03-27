import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createSession } from '../lib/auth';

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  // If they clicked an invite link to install the app, we grab the canvasId from the URL!
  const inviteId = route.params?.canvasId || null;
  const isInvite = !!inviteId;

  const handleClaim = async () => {
    // 1. Create real anonymous device session in AsyncStorage
    await createSession(name);
    
    // 2. Go to step 2 (educational)
    setStep(2);
  };

  const handleFinish = () => {
    // Navigate away from Onboarding to the Main App. 
    // They are now authenticated!
    navigation.replace('MainCanvas', inviteId ? { canvasId: inviteId } : undefined);
  };

  if (step === 1) {
    return (
      <SafeAreaView className="flex-1 bg-[#fff4f6]">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 px-6 justify-center w-full mx-auto">
          {/* Dynamic Content based on generic organic install vs Invite Link */}
          <View className="items-center mb-12">
            <View className="w-20 h-20 bg-[#ffd0e6] rounded-full items-center justify-center mb-6 shadow-sm border-[4px] border-white">
              <MaterialIcons name={isInvite ? "favorite" : "draw"} size={40} color="#a7295a" />
            </View>
            <Text className="text-4xl font-extrabold text-[#492138] mb-4 text-center">
              {isInvite ? "You've been invited." : "Welcome to Doodle Bound."}
            </Text>
            <Text className="text-[#7b4d66] text-lg text-center px-4 leading-relaxed font-medium">
              {isInvite ? "Your friend invited you to a shared Canvas. " : "Create shared widgets with your friends. "}
              No passwords. No profiles. Just your name.
            </Text>
          </View>

          <View className="w-full relative justify-center mb-8 max-w-sm mx-auto">
            <Text className="text-sm font-bold uppercase tracking-[0.2em] text-[#a7295a] mb-3 px-2 text-center">What's your name?</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="e.g. Alex"
              placeholderTextColor="#d59db9"
              autoFocus
              className="w-full bg-white text-3xl font-bold text-[#492138] px-6 py-6 rounded-2xl border border-[#d59db9]/30 shadow-sm text-center"
            />
          </View>

          <View className="w-full mt-auto mb-10 max-w-sm mx-auto">
            <TouchableOpacity 
              disabled={name.length < 2}
              onPress={handleClaim}
              className={`w-full py-5 rounded-full items-center justify-center flex-row shadow-lg ${name.length < 2 ? 'bg-[#d59db9]/50' : 'bg-[#a7295a] active:scale-95'}`}
            >
              <Text className={`${name.length < 2 ? 'text-[#fff4f6]' : 'text-white'} font-extrabold text-xl mr-2`}>Start Drawing</Text>
              <MaterialIcons name="arrow-forward" size={24} color={name.length < 2 ? '#fff4f6' : 'white'} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black relative">
      <View className="absolute inset-0 z-0">
        <Image 
          source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLAVSGWQmwcUXBlt5QdqwWDRd5T6ZW6YSTvOyxwLDT1s3Xup4bo4FJz6yDUOQ36HYSdktYkLdyf9AML3C8CQ1BFhTLyiPhJO_aF6mCyCVaQHr33WRfhnMCnXAC8yRdqvQRw_JFDuVPFgTenCpfn_wl9cSt0SdCiny5SXFjT6-9hpOLP0S8icMaRWTe_mfN5ZUWwBa0kML--ypplXF19F8UcZEfFZwPEeUmWioYAG7ESe02hlg6VtnqyRi1q8_aNL3afRrtUI4mV9U" }} 
          className="w-full h-full opacity-60" 
          resizeMode="cover" 
        />
        <View className="absolute inset-0 items-center justify-center">
            <MaterialIcons name="gesture" size={280} color="#fdd34d" style={{opacity: 0.9, transform: [{rotate: '15deg'}]}} />
        </View>
      </View>

      <View className="flex-1 px-6 justify-between z-10 py-10 w-full items-center">
        <View className="items-center mt-6 w-full max-w-sm">
           <View className="bg-black/40 px-5 py-2.5 rounded-full border border-white/20 mb-6 flex-row items-center gap-3 shadow-md">
              <View className="w-2.5 h-2.5 rounded-full bg-[#fdd34d] shadow-md shadow-[#fdd34d]/50" />
              <Text className="text-white font-bold text-xs uppercase tracking-widest">{isInvite ? "Joining Canvas..." : "Your First Canvas"}</Text>
           </View>
           <Text className="text-4xl font-extrabold text-white text-center leading-tight">Draw something to claim it.</Text>
        </View>

        <View className="w-full items-center mt-auto pb-6 gap-6 max-w-sm">
          <TouchableOpacity 
            onPress={handleFinish}
            className="w-full py-5 rounded-full bg-white flex-row items-center justify-center shadow-xl active:scale-95"
          >
            <Text className="text-[#a7295a] font-extrabold text-xl mr-2">I'm Ready</Text>
            <MaterialIcons name="check" size={24} color="#a7295a" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
