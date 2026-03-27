import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ActiveBeaconsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#fff4f6]">
      {/* TopAppBar */}
      <View className="w-full flex-row justify-between items-center px-6 py-4 bg-[#fff4f6] z-50">
        <View className="flex-row items-center gap-2">
          <MaterialIcons name="draw" size={28} color="#a7295a" />
          <Text className="text-2xl font-extrabold text-[#a7295a] tracking-tight italic">Doodle Bound</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <MaterialIcons name="notifications" size={24} color="#a7295a" />
          <View className="w-10 h-10 rounded-full border-2 border-[#ff709f] overflow-hidden bg-[#ffd0e6]">
            <Image 
              source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOf6LwG83QZLqMcDKI6b3F7dt4Xy7_nM5EpBBk5rlBv528eJVUfmIu9ZnmuSUWhNuEqJ5EWXbxb1AHMtuybE8GWVprkKjAyhSaxVDILV0b02FY6EVY0NiqXwjE-DXobPouO8vJmIF4b-ulhj_T9QzSvEkypZGxLZWfwkWM-QqPWf5N43aowuZ7KXhEPVkAe8Qzaz8bXSxq4L3jUo69gvRL8b2Pq1VGA7NhNDoCnp1bNHtqKB-pYRRmPJeMPqS7uKsZkA6E-Xyy9ec" }} 
              className="w-full h-full"
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6 w-full max-w-5xl mx-auto">
          
          {/* Header Section */}
          <View className="mb-8">
            <Text className="text-4xl font-extrabold text-[#492138] tracking-tight mb-2">Active Beacons</Text>
            <Text className="text-[#7b4d66] font-medium text-lg italic">Your Inner 5 are looking for company.</Text>
          </View>

          {/* The Bento Grid for Inner 5 */}
          <View className="flex-col gap-6">
            
            {/* Friend 1 (Active Beacon - Large) */}
            <View className="bg-[#ffecf3] rounded-xl p-6 relative overflow-hidden border border-[#d59db9]/20 shadow-sm">
              <View className="flex-row items-start gap-4 z-10">
                <View className="relative">
                  <View className="w-20 h-20 rounded-full overflow-hidden border-[3px] border-[#fdd34d]">
                    <Image source={{uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuD05BPXtVZN4x48UnuEN__JxnCHt9JBdOoKHuCj4o3ZpTUfWCNClkeJiHXhZam9l076gqPjvzhMkVMuk1xHswh2borXiPfCNUWpOd4DeAw61VoBhxqKL0oAJ70pU9a1CGvLGZRS6drIN3W4ULhbRLrp5F5mj1E4iyaOTwm4-mSyRsLibAkpQH6oz-6g0USjZMhRhQTBd7jCX-DQkaeL0aE-mOmy36KOhMcMpG8bxjS2z1KV-TDnBnox4nNbh-wSVJ7oc71RPMxQhlE"}} className="w-full h-full" />
                  </View>
                  <View className="absolute -bottom-1 -right-1 bg-[#705900] p-1.5 rounded-full border-[3px] border-[#ffecf3]">
                    <MaterialIcons name="auto-awesome" size={14} color="white" />
                  </View>
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center gap-2 mb-1">
                    <Text className="text-[#705900] font-bold tracking-widest text-[10px] uppercase">Wanna Join?</Text>
                    <View className="w-1 h-1 rounded-full bg-[#705900]" />
                    <Text className="text-[#7b4d66] text-xs">Active 12m ago</Text>
                  </View>
                  <Text className="font-extrabold text-2xl text-[#492138] leading-tight mb-2">Elena @ Central Library</Text>
                  <Text className="text-[#7b4d66] font-medium">"Deep diving into some architecture sketches. Anyone want to doodle along?"</Text>
                  
                  <View className="flex-row gap-3 mt-4">
                    <TouchableOpacity className="flex-1 py-3 rounded-full bg-[#a7295a] items-center justify-center">
                      <Text className="text-white font-bold">Join</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 py-3 rounded-full bg-[#ffd0e6] items-center justify-center">
                      <Text className="text-[#a7295a] font-bold">Wink</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Friend 2 (Active Beacon) */}
            <View className="bg-white rounded-xl p-6 border border-[#d59db9]/20 shadow-sm" style={{transform:[{rotate:'-1deg'}]}}>
              <View className="flex-row items-center gap-4 mb-4">
                <View className="w-16 h-16 rounded-full overflow-hidden border-[3px] border-[#fdd34d]">
                  <Image source={{uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMwRCxHD3_NuBzGfqLYldG8Pvc4hBAYSUbwWmiUuaFgAY0jXWNY6mN6I8A8zaOYamwJUrRc7aA0sg6dUK1ODxW7tQ94ab9zsHTRMoH4HvPPOL4PZc6KtdLTSY1EDFPSJG3BmbAtXaOVfCwQFVZz_zCSRmGZaHz8L2HgDnaSj_Ajx4Ybglq-3zfpvn4VCF2aKXYYjQm02XMboPCk9zKLHTL_vmj4xpF1w4Ga39BES6KWGhwq5za1VgWl1tuguhu8leJMqNOp01gXxI"}} className="w-full h-full" />
                </View>
                <View>
                  <Text className="font-extrabold text-xl text-[#492138]">Marcus</Text>
                  <Text className="text-[#705900] font-bold text-[10px] uppercase">Wanna Join?</Text>
                </View>
              </View>
              <Text className="text-[#492138] font-medium italic mb-6">"At Blue Bottle Coffee. Need a break from the screen."</Text>
              <View className="flex-row gap-2">
                <TouchableOpacity className="flex-1 py-2.5 rounded-full bg-[#a7295a] items-center justify-center">
                  <Text className="text-white text-sm font-bold">Join</Text>
                </TouchableOpacity>
                <TouchableOpacity className="p-2.5 rounded-full bg-[#ffecf3] items-center justify-center">
                  <MaterialIcons name="favorite" size={20} color="#a7295a" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Friend 3 (Inactive) */}
            <View className="bg-[#ffe0ed] rounded-xl p-6 items-center">
              <View className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-[#d59db9] opacity-60">
                <Image source={{uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlG6of3Me1PLvMegkCFu7QhTd7E63K9kxYL-VU5YePFTMtkwzr2Iawr2Dhe-nouX2Apa6oPdFV7H8-eTCyGwgcXXfCg3xl08mUpy4R4Qfbo08l2Ejk2VcWLoCDvIQnhnRH5zvoaV-EwmcTl9QriFP5HcsWwD9-7_0FD76Brgnf8IeDmOqYyy764JvsJfwz_HH5Yk16aRv5ZQBVbU8dW_EKIyhUYj8AAt5yg57uboXQ1OjBR0raDPmhC8IYOxOzTRvDEqLMroXbflk" }} className="w-full h-full" />
              </View>
              <Text className="font-extrabold text-lg text-[#492138]">Julian</Text>
              <Text className="text-[#7b4d66] text-xs mb-3">Last seen: Sunset Park</Text>
              <TouchableOpacity className="py-2 px-4 rounded-full border border-[#a7295a]/20">
                <Text className="text-[#a7295a] text-xs font-bold uppercase tracking-widest">Send Spark</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity className="absolute right-6 bottom-24 w-14 h-14 bg-[#fdd34d] rounded-2xl shadow-xl items-center justify-center z-40">
        <MaterialIcons name="add-location-alt" size={28} color="#463600" />
      </TouchableOpacity>

      {/* Bottom Nav Bar */}
      <View className="absolute bottom-0 left-0 w-full flex-row justify-around items-center px-4 pb-8 pt-4 bg-white/90 border-t border-[#d59db9]/20 rounded-t-3xl">
        <TouchableOpacity className="items-center justify-center px-3 py-2">
          <MaterialIcons name="auto-stories" size={24} color="#492138" />
          <Text className="font-medium text-[10px] uppercase tracking-widest text-[#492138] mt-1">Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center px-3 py-2">
          <MaterialIcons name="celebration" size={24} color="#492138" />
          <Text className="font-medium text-[10px] uppercase tracking-widest text-[#492138] mt-1">Invite</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center bg-[#a7295a] rounded-full px-5 py-2 -mt-6 shadow-md shadow-[#a7295a]/30">
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
