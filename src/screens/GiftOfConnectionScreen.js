import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function GiftOfConnectionScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#fff4f6]">
      {/* TopAppBar */}
      <View className="w-full h-16 flex-row justify-between items-center px-6 bg-[#fff4f6]/80 z-50">
        <View className="flex-row items-center gap-4">
          <MaterialIcons name="menu" size={28} color="#a7295a" />
        </View>
        <Text className="text-2xl font-extrabold text-[#a7295a] tracking-tight italic">Doodle Bound</Text>
        <View className="w-8 h-8 rounded-full border-2 border-primary-container overflow-hidden">
          <Image 
            source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuC15bvKOk1tAZ_9vZvyvNdyTesdcxfr9ej35tAwVNcbrwWywjkxcANmFJgFEUeqog6i9oNId7wHIS1e2RNsPZutKqJNp7Fm3ieJXduhtwpZQQtN_TaPMmQfpEaJ7wiAR_RXJiBFBs403JwWQqDILdosFTafLnyGyeccDdPArAfGKe1pd1qVo9R509cr-CVc51vURYunp2MtDoaCl98WGqKT3aMNjkah7CJ8nyJYqqfhtcuMcViIMWtee0uSPveN0PUxDrNKX3JZHNw" }} 
            className="w-full h-full"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 120, alignItems: 'center' }} showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-8 w-full max-w-xl items-center">
          
          {/* Hero Section */}
          <View className="w-full text-center mb-12 items-center">
            <Text className="text-5xl font-extrabold text-[#492138] mb-6 tracking-tighter text-center leading-tight">
              Claim a spot on their home screen.
            </Text>
            <Text className="text-[#7b4d66] text-xl text-center px-4 max-w-sm font-medium">
              Most people broadcast to everyone. This is just for you.
            </Text>
          </View>

          {/* The Gift Card */}
          <View className="relative w-full max-w-md mb-16">
            <View className="absolute inset-0 bg-[#f06292]/20 rounded-xl" style={{transform:[{rotate:'-2deg'}, {translateY:8}]}}></View>
            <View className="bg-white rounded-xl shadow-lg border border-[#d59db9]/20 p-8 items-center relative overflow-hidden z-10">
              
              {/* Ribbon Visual */}
              <View className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                <View className="absolute top-0 right-0 bg-[#a7295a] py-1 w-48 items-center justify-center transform rotate-45 translate-x-12 translate-y-6">
                  <Text className="text-white text-[10px] uppercase tracking-widest font-bold">Gift Inside</Text>
                </View>
              </View>

              {/* Central Illustration/Gift Box */}
              <View className="mb-8 relative mt-4">
                <View className="w-44 h-44 bg-[#a7295a] rounded-3xl items-center justify-center shadow-md transform rotate-2">
                  <MaterialIcons name="redeem" size={72} color="white" />
                </View>
                <View className="absolute -top-4 -right-4">
                  <MaterialIcons name="auto-awesome" size={32} color="#705900" />
                </View>
                <View className="absolute -bottom-2 -left-6">
                  <MaterialIcons name="auto-awesome" size={28} color="#a7295a" />
                </View>
              </View>

              {/* Message Preview Box */}
              <View className="w-full">
                <View className="flex-row items-center gap-2 mb-3">
                  <MaterialIcons name="edit-note" size={18} color="#7b4d66" />
                  <Text className="text-[#7b4d66] text-[10px] uppercase tracking-widest font-bold">Personal Message</Text>
                </View>
                <View className="bg-[#ffecf3] p-6 rounded-2xl border border-[#a7295a]/10 mb-5">
                  <Text className="italic text-[#492138] text-base leading-relaxed">
                    "Thinking of you! I'd love to share this digital scrapbook together. Every doodle tells our story. Can't wait to see what you draw!"
                  </Text>
                </View>
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-[#a7295a]/10 items-center justify-center">
                    <MaterialIcons name="draw" size={20} color="#a7295a" />
                  </View>
                  <View>
                    <Text className="font-extrabold text-sm text-[#492138]">Sent from Alex</Text>
                    <Text className="text-xs text-[#7b4d66] font-medium">Doodle Bound Creator</Text>
                  </View>
                </View>
              </View>

            </View>
          </View>

          {/* Action Section */}
          <View className="w-full max-w-sm flex-col gap-4">
            <TouchableOpacity className="w-full py-5 rounded-full bg-[#a7295a] flex-row items-center justify-center gap-2 shadow-lg active:scale-95 mb-4">
              <Text className="text-white font-extrabold text-xl">Send as Gift</Text>
              <MaterialIcons name="send" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="w-full py-4 rounded-full bg-[#ffd0e6] items-center justify-center">
              <Text className="text-[#7b4d66] font-bold text-xs uppercase tracking-widest">Edit Message</Text>
            </TouchableOpacity>
          </View>

          {/* Editorial Info Blocks */}
          <View className="mt-16 w-full max-w-md flex-col pb-8">
            <View className="bg-[#ffecf3] p-8 rounded-3xl items-center border border-[#d59db9]/10 mb-6 w-full">
              <View className="w-12 h-12 bg-[#fdd34d] rounded-full items-center justify-center mb-4">
                <MaterialIcons name="home" size={24} color="#5c4900" />
              </View>
              <Text className="text-2xl font-extrabold text-[#492138] mb-2 text-center">A Permanent Home</Text>
              <Text className="text-[#7b4d66] text-center font-medium">This invite grants them a dedicated widget on their home screen for instant doodling. No apps to search for—just one tap away.</Text>
            </View>
            <View className="w-full h-72 rounded-3xl overflow-hidden relative shadow-md bg-black">
              <Image 
                source={{uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLAVSGWQmwcUXBlt5QdqwWDRd5T6ZW6YSTvOyxwLDT1s3Xup4bo4FJz6yDUOQ36HYSdktYkLdyf9AML3C8CQ1BFhTLyiPhJO_aF6mCyCVaQHr33WRfhnMCnXAC8yRdqvQRw_JFDuVPFgTenCpfn_wl9cSt0SdCiny5SXFjT6-9hpOLP0S8icMaRWTe_mfN5ZUWwBa0kML--ypplXF19F8UcZEfFZwPEeUmWioYAG7ESe02hlg6VtnqyRi1q8_aNL3afRrtUI4mV9U"}} 
                className="w-full h-full opacity-80"
              />
              <View className="absolute inset-0 justify-end p-8 bg-black/20">
                <Text className="text-white font-extrabold text-2xl italic leading-tight shadow-md">Every gift is a new beginning.</Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Bottom Nav Bar (Absolute) */}
      <View className="absolute bottom-0 left-0 w-full flex-row justify-around items-center px-4 pb-8 pt-4 bg-white/95 border-t border-[#d59db9]/20 rounded-t-3xl shadow-lg">
        <TouchableOpacity className="items-center justify-center px-3 py-2">
          <MaterialIcons name="auto-stories" size={28} color="#7b4d66" />
          <Text className="font-bold text-[10px] uppercase tracking-widest text-[#7b4d66] mt-1">Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center bg-[#a7295a] rounded-full px-6 py-3 -mt-10 shadow-lg shadow-[#a7295a]/40">
          <MaterialIcons name="redeem" size={28} color="white" />
          <Text className="font-bold text-[10px] uppercase tracking-widest text-white mt-1">Invite</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center px-3 py-2">
          <MaterialIcons name="draw" size={28} color="#7b4d66" />
          <Text className="font-bold text-[10px] uppercase tracking-widest text-[#7b4d66] mt-1">Doodles</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center px-3 py-2">
          <MaterialIcons name="settings" size={28} color="#7b4d66" />
          <Text className="font-bold text-[10px] uppercase tracking-widest text-[#7b4d66] mt-1">Settings</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}
