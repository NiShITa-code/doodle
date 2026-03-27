import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function TimeMachineScreen({ onClose }) {
  // Mock data for the scrapbook
  const memories = [
    { id: 1, date: 'Today, 2:30 PM', friend: 'Elena', img: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=500&h=500&fit=crop', type: 'photo_doodle' },
    { id: 2, date: 'Yesterday', friend: 'Marcus', img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&h=500&fit=crop', type: 'beacon' },
    { id: 3, date: 'Oct 12', friend: 'Elena', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=500&fit=crop', type: 'photo_doodle' },
    { id: 4, date: 'Oct 10', friend: 'Marcus', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=500&fit=crop', type: 'photo_doodle' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#111]">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 z-50">
        <TouchableOpacity onPress={onClose} className="w-10 h-10 bg-white/10 rounded-full items-center justify-center border border-white/20">
          <MaterialIcons name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-xl font-extrabold text-white tracking-widest uppercase">The Vault</Text>
        <TouchableOpacity className="w-10 h-10 bg-[#a7295a] rounded-full items-center justify-center">
          <MaterialIcons name="ios-share" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 250 }} showsVerticalScrollIndicator={false}>
        
        {/* Cinematic Header */}
        <View className="px-6 py-8 items-center">
          <MaterialIcons name="hourglass-empty" size={32} color="#fdd34d" style={{ marginBottom: 16 }} />
          <Text className="text-4xl font-extrabold text-white text-center mb-2">Time Machine.</Text>
          <Text className="text-white/60 text-center px-4">
            Every doodle, every spark, saved forever. Rewind the strokes or export them as a video.
          </Text>
        </View>

        {/* Video Exporter CTA (Viral TikTok Engine) */}
        <View className="px-6 mb-10 w-full max-w-sm mx-auto">
          <View className="bg-[#a7295a] p-1 rounded-3xl">
            <View className="bg-[#1a0a13] rounded-3xl p-6 items-center border border-[#fcbcff]/20">
              <View className="flex-row gap-2 mb-4">
                <View className="bg-[#fcbcff]/20 px-3 py-1 rounded-full"><Text className="text-[#fcbcff] font-bold text-xs">✨ TikTok Ready</Text></View>
              </View>
              <Text className="text-2xl font-bold text-white mb-2 text-center">Export Memory Wrap</Text>
              <Text className="text-white/60 text-center text-sm mb-6">Create a smooth 15-second compilation video of this month's best doodles to share instantly.</Text>
              
              <TouchableOpacity className="w-full py-4 rounded-full bg-white flex-row items-center justify-center shadow-lg gap-2 active:scale-95">
                <Text className="text-[#a7295a] font-extrabold text-lg">Generate Video</Text>
                <MaterialIcons name="play-circle-filled" size={24} color="#a7295a" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Masonry Grid */}
        <View className="px-6 flex-row flex-wrap justify-between">
          {memories.map((mem, index) => (
            <TouchableOpacity key={mem.id} className="w-[48%] aspect-[4/5] rounded-2xl mb-4 overflow-hidden bg-[#222] border border-white/10 relative">
              <Image source={{uri: mem.img}} className="w-full h-full opacity-60" />
              
              {/* Fake Doodle Overlay */}
              <View className="absolute inset-0 items-center justify-center">
                <MaterialIcons name="gesture" size={100} color={index % 2 === 0 ? "#fdd34d" : "#a7295a"} style={{transform:[{rotate:'10deg'}]}} />
              </View>

              {/* Data overlay */}
              <View className="absolute bottom-0 left-0 w-full p-3 bg-black/60 pt-6">
                <Text className="text-white font-bold text-sm">{mem.friend}</Text>
                <Text className="text-white/60 text-[10px] uppercase font-bold tracking-widest">{mem.date}</Text>
              </View>

              {/* Rewind Icon */}
              <View className="absolute top-3 right-3 w-8 h-8 bg-black/40 rounded-full items-center justify-center border border-white/20">
                <MaterialIcons name="restore" size={16} color="white" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* Paywall Overlay (If not subscribed) */}
      <View className="absolute bottom-0 left-0 w-full p-6 pt-24 items-center z-50 bg-[#111]/90">
        <View className="w-16 h-16 bg-[#fdd34d]/20 rounded-full items-center justify-center mb-4 border border-[#fdd34d]/50">
          <MaterialIcons name="lock" size={28} color="#fdd34d" />
        </View>
        <Text className="text-white font-extrabold text-2xl mb-2">Unlock the Vault</Text>
        <Text className="text-white/70 text-center px-4 mb-6">
          Doodles fade after 24 hours. Subscribe to keep them forever and unlock the Video Exporter.
        </Text>
        <TouchableOpacity className="w-full max-w-sm py-4 rounded-full bg-[#fdd34d] shadow-lg flex-row justify-center items-center gap-2 active:scale-95">
          <Text className="text-[#5c4900] font-extrabold text-lg">Subscribe • $4.99/mo</Text>
        </TouchableOpacity>
        <Text className="text-white/40 text-xs mt-4">Cancel anytime. RevenueCat handled.</Text>
      </View>
    </SafeAreaView>
  );
}
