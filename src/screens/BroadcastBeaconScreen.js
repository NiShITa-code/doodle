import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView, TextInput, Switch, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function BroadcastBeaconScreen() {
  const [wannaJoin, setWannaJoin] = useState(true);
  const [location, setLocation] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-[#fff4f6]">
      {/* TopAppBar */}
      <View className="w-full flex-row justify-between items-center px-6 py-4 bg-[#fff4f6]">
        <View className="flex-row items-center gap-2">
          <MaterialIcons name="draw" size={28} color="#a7295a" />
          <Text className="text-2xl font-extrabold text-[#a7295a] tracking-tight italic">Doodle Bound</Text>
        </View>
        <View className="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden bg-surface-container-highest">
          <Image 
            source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDg91w91tvR7LgCb-9WuW-MOhL_GI6257NiSHPpWsDUlQZlwEzmf4eDH-DNTMcFmhspMXcjj4-B_ZtoQCuxfj0R4TNykOofI4hH3J4LzRXCFmC1bxxqmg7neDUYl4S5x0PyJFO1aSJHyCtmEFKcfFyF8RuabgZ9QrF7UEO_CdPAzmsePlUDhVYUkbHC-YYes-TNJ4LCWGou_KHaf5_yW3-htH_cSnHsrToLF1UVB6SEy5MWxQ5ddmybm-EoxbUiifPjmV2wzstvrjM" }} 
            className="w-full h-full"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6 w-full max-w-2xl mx-auto">
          
          {/* Header Section */}
          <View className="mb-10 w-full">
            <Text className="text-5xl font-extrabold text-[#492138] mb-3">
              Broadcast Your <Text className="text-[#a7295a] italic">Beacon</Text>
            </Text>
            <Text className="text-[#7b4d66] text-lg">
              Let your Inner 5 know where the vibe is. Pick an activity and plant your flag.
            </Text>
          </View>

          {/* Activity Grid */}
          <View className="flex-row flex-wrap justify-between gap-y-4 mb-10 w-full">
            {/* Large Coffee Card */}
            <TouchableOpacity className="w-full h-48 rounded-xl bg-[#ffd8e9] p-6 justify-end relative overflow-hidden">
              <MaterialIcons name="local-cafe" size={36} color="#a7295a" className="mb-2" />
              <Text className="font-bold text-2xl text-[#492138]">Coffee</Text>
              <Text className="text-[#7b4d66]">Hunting for the perfect brew</Text>
              <View className="absolute -right-4 -bottom-4 opacity-10">
                <MaterialIcons name="local-cafe" size={120} color="#a7295a" />
              </View>
               <View className="absolute top-4 right-4 bg-[#a7295a] p-2 rounded-full">
                <MaterialIcons name="check" size={16} color="white" />
              </View>
            </TouchableOpacity>

            {/* Small Cards */}
            {[
              { title: 'Gym', icon: 'fitness-center', color: '#9720ab' },
              { title: 'Study', icon: 'menu-book', color: '#705900' },
              { title: 'Crossword', icon: 'extension', color: '#a7295a' },
              { title: 'Lunch', icon: 'restaurant', color: '#9720ab' },
            ].map((activity, index) => (
              <TouchableOpacity key={index} className="w-[48%] aspect-square rounded-xl bg-white shadow-sm border border-[#d59db9]/20 items-center justify-center gap-2">
                <MaterialIcons name={activity.icon} size={32} color={activity.color} />
                <Text className="font-bold tracking-wide text-[#492138]">{activity.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Location Picker */}
          <View className="bg-[#ffe0ed] rounded-xl p-6 mb-8 relative overflow-hidden w-full">
            <Text className="text-sm font-bold uppercase tracking-widest text-[#7b4d66] mb-4">Where are you?</Text>
            <View className="relative justify-center w-full">
              <View className="absolute left-4 z-10" style={{ elevation: (Platform.OS === 'android' ? 1 : 0) }}>
                <MaterialIcons name="location-on" size={24} color="#a7295a" />
              </View>
              <TextInput 
                value={location}
                onChangeText={setLocation}
                className="w-full bg-white rounded-full py-4 pl-12 pr-6 text-lg font-medium text-[#492138] absolute"
                style={{ position: 'relative' }}
                placeholder="e.g., Espresso House"
                placeholderTextColor="#d59db9"
              />
            </View>
            <View className="mt-5 flex-row flex-wrap gap-2 w-full">
              <TouchableOpacity className="bg-[#ffd8e9] px-4 py-2 rounded-full">
                <Text className="text-sm font-medium text-[#a7295a]">Nearby: Downtown Loft</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-[#ffd8e9] px-4 py-2 rounded-full mt-2">
                <Text className="text-sm font-medium text-[#a7295a]">The Library</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Wanna Join Toggle */}
          <View className="flex-row items-center justify-between p-6 bg-[#ffd0e6] rounded-xl border-l-4 border-[#705900] mb-8 w-full">
            <View className="flex-1 mr-4">
              <Text className="font-bold text-xl text-[#492138]">Wanna Join?</Text>
              <Text className="text-[#7b4d66] text-sm mt-1">Broadcast an open invite to your inner circle.</Text>
            </View>
            <Switch 
              value={wannaJoin} 
              onValueChange={setWannaJoin} 
              trackColor={{ false: "#d59db9", true: "#fdd34d" }}
              thumbColor={"#ffffff"}
            />
          </View>

          {/* CTA */}
          <TouchableOpacity className="w-full py-4 rounded-full bg-[#a7295a] items-center justify-center">
            <Text className="text-white font-extrabold text-xl">Light the Beacon</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Bottom Nav Bar (Absolute) */}
      <View className="absolute bottom-0 left-0 w-full flex-row justify-around items-center px-4 pb-8 pt-4 bg-white/90 border-t border-[#d59db9]/20 rounded-t-3xl">
        <TouchableOpacity className="items-center justify-center px-3 py-2">
          <MaterialIcons name="menu-book" size={24} color="#492138" />
          <Text className="font-medium text-[10px] uppercase tracking-widest text-[#492138] mt-1">Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center px-3 py-2">
          <MaterialIcons name="celebration" size={24} color="#492138" />
          <Text className="font-medium text-[10px] uppercase tracking-widest text-[#492138] mt-1">Invite</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center bg-[#a7295a] rounded-full px-5 py-2 -mt-6 shadow-md shadow-primary/30">
          <MaterialIcons name="brush" size={24} color="white" />
          <Text className="font-medium text-[10px] uppercase tracking-widest text-white mt-1">Doodles</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center px-3 py-2">
          <MaterialIcons name="settings" size={24} color="#492138" />
          <Text className="font-medium text-[10px] uppercase tracking-widest text-[#492138] mt-1">Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
