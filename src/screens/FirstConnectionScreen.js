import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function FirstConnectionScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#fff4f6] justify-center items-center relative overflow-hidden">
      {/* Abstract Confetti Elements (Tonal Depth) */}
      <View className="absolute top-10 left-10 w-24 h-24 bg-[#fdd34d]/30 rounded-full" />
      <View className="absolute bottom-20 right-10 w-40 h-40 bg-[#fcbcff]/20 rounded-full" />
      <View className="absolute top-1/4 right-1/4 w-12 h-12 bg-[#a7295a]/10 rounded-lg border border-[#a7295a]/10" style={{transform:[{rotate:'-2deg'}]}} />

      {/* Celebration Canvas */}
      <View className="w-full max-w-xl px-6 z-10 items-center">
        
        {/* Hero Typography */}
        <View className="items-center mb-12">
          <Text className="font-bold text-[#a7295a] uppercase tracking-[0.2em] text-xs mb-4">Magic happens</Text>
          <Text className="text-6xl font-extrabold text-[#492138] leading-tight text-center">
            You're <Text className="italic text-[#a7295a]">Linked!</Text>
          </Text>
          <Text className="text-[#7b4d66] text-lg text-center mt-6 px-4">
            A direct line between your creativity and theirs. The digital scrapbook is now open.
          </Text>
        </View>

        {/* Identity Reveal - Asymmetric Bento Style */}
        <View className="relative items-center mb-12 w-full">
          
          {/* Inner Circle Icon Preview */}
          <View style={{transform:[{rotate:'3deg'}]}}>
            <View className="w-56 h-56 bg-[#ffd0e6] rounded-2xl p-6 shadow-xl items-center justify-center overflow-hidden border border-white">
              <View className="w-32 h-32 bg-white rounded-full items-center justify-center shadow-md mb-4">
                <MaterialIcons name="draw" size={64} color="#a7295a" />
              </View>
              <Text className="font-extrabold text-xl text-[#492138] tracking-tight">Inner Circle</Text>
            </View>
            
            {/* Decorative Doodle Stickers */}
            <View className="absolute -top-6 -left-6 w-24 h-24 bg-[#fdd34d] rounded-full items-center justify-center shadow-lg border-4 border-[#fff4f6] overflow-hidden" style={{transform:[{rotate:'-2deg'}]}}>
              <Image 
                source={{uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCN3A4e9Hg3mptOx5Nl9qZ_j_7x2WACumgoImNgD_52Xg6iv-QV284tL34aMR0OnE8F-82dU-csLFMxNpa8hDDilgXML07hYxqV23wquU_q2Fc-egOOOZ5-ojGOAriTwcGuS0F6lQfU_zpAAuusOWixrbAqrdRiy2XWRE-mrelH7GPnpW3foL6-v8l5681ACuTnwW_i9t0xbzVQkzE5Ktcra6v3I86Ganlir1oZu8w1hPhiNaee9uNGinJrpBgPVu7U0mIFcp4JtAY"}}
                className="w-full h-full"
              />
            </View>
            
            <View className="absolute -bottom-4 -right-4 px-4 py-2 bg-[#9720ab] rounded-full shadow-lg" style={{transform:[{rotate:'-2deg'}]}}>
              <Text className="text-[#ffeefb] font-bold text-xs uppercase tracking-widest">Est. Today</Text>
            </View>
          </View>

        </View>

        {/* Action Cluster */}
        <View className="items-center w-full mt-6">
          <TouchableOpacity className="w-full py-5 bg-[#a7295a] rounded-full shadow-lg shadow-[#a7295a]/30 items-center justify-center active:scale-95 mb-4">
            <Text className="text-white font-bold text-xl">Start Doodling</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-full py-4 bg-[#ffecf3] rounded-full items-center justify-center">
            <Text className="text-[#a7295a] font-semibold text-sm">Explore Journal</Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* Footer Branding (Minimal) */}
      <View className="absolute bottom-8 left-0 w-full items-center opacity-40">
        <Text className="font-extrabold text-[#492138] italic tracking-tight text-xl uppercase">Doodle Bound</Text>
      </View>

    </SafeAreaView>
  );
}
