import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ClaimYourSpotScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* TopAppBar */}
      <View className="w-full flex-row justify-between items-center px-6 py-4 bg-surface">
        <View className="flex-row items-center gap-2">
          <MaterialIcons name="auto-awesome" size={24} color="#a7295a" />
        </View>
        <Text className="text-2xl font-extrabold text-[#a7295a] tracking-tight">Doodle Bound</Text>
        <View className="flex-row items-center gap-2">
          <MaterialIcons name="stars" size={24} color="#a7295a" />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 items-center justify-center px-6 pt-8 pb-24 w-full">
          
          {/* Header Section */}
          <View className="items-center mb-10 w-full">
            <Text className="text-4xl font-extrabold text-on-surface tracking-tight text-center">You're one in five.</Text>
            <Text className="text-on-surface-variant text-lg text-center mt-3 max-w-sm">
              Who gets a permanent spot on your home screen? This isn't just a link—it's a shared secret.
            </Text>
          </View>

          {/* Card Container Layout */}
          <View className="w-full aspect-[4/5] relative max-w-md">
            {/* The Main Gift Card */}
            <View className="h-full w-full bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-[#d59db9] relative z-10">
              
              {/* Card Hero Image */}
              <View className="flex-[0.5] w-full relative">
                <Image 
                  source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVNldykpecJVfD3ZHQOmv8o_pLMW_l7M98-eIgL_KmQc0r6p9Sr2u17A3z5P55878eJts0Trw_Ob_8_5vC2KNig3wJr_CWOogc1ySDdrT7uyp_758pS0B_QNuyhNaN__nLSULaYVcFnlFtq24LFqkfMkP7QJUwBwEEjfJ2GWC2mszQvjSGBatw8iD5k1vMQ9-y7LdfxMghmmnWYgD11B5bqYJ7CFkl9-8wJpsM2-8jC9DgPWGcWzekbLWw-LMvP7A5qgWTLVA96M8" }} 
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute top-4 right-4 bg-tertiary-container px-4 py-2 rounded-full rotate-6 shadow-sm">
                  <Text className="text-on-tertiary-container font-bold text-xs">INNER CIRCLE NO. 1</Text>
                </View>
              </View>

              {/* Card Content */}
              <View className="flex-[0.5] p-6 items-center justify-between">
                <View className="items-center w-full">
                  <View className="w-16 h-1 bg-primary-container rounded-full opacity-30 mb-4" />
                  <Text className="text-2xl font-bold text-on-surface text-center">The Invite</Text>
                  <Text className="text-on-surface-variant font-medium italic text-center mt-3">
                    "I chose you for my first spot. Let's make this our place."
                  </Text>
                </View>
                
                {/* Customization Pills */}
                <View className="flex-row flex-wrap justify-center mt-4">
                  <TouchableOpacity className="px-3 py-2 rounded-full bg-surface-container m-1">
                    <Text className="text-primary text-xs font-bold">Change Quote</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="px-3 py-2 rounded-full bg-surface-container m-1">
                    <Text className="text-primary text-xs font-bold">Pick Color</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="px-3 py-2 rounded-full bg-surface-container m-1">
                    <Text className="text-primary text-xs font-bold">Add Photo</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Card Footer Seal */}
              <View className="bg-surface-container-low py-4 flex-row justify-center items-center">
                <MaterialIcons name="verified" size={16} color="#a7295a" />
                <Text className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-2">Authenticated Secret</Text>
              </View>
            </View>

            {/* Asymmetric Tucked-in Badge */}
            <View className="absolute -bottom-6 -right-4 w-20 h-20 bg-secondary-container rounded-full items-center justify-center -rotate-12 border-2 border-[#fff4f6] shadow-md z-20">
              <MaterialIcons name="loyalty" size={32} color="#7c0091" />
            </View>
          </View>

          {/* Action Call */}
          <View className="mt-16 w-full max-w-xs">
            <TouchableOpacity className="w-full py-4 rounded-full bg-[#a7295a] items-center justify-center shadow-md">
              <Text className="text-white font-bold text-lg">Send as Gift</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full py-4 rounded-full items-center justify-center mt-2">
              <Text className="text-primary font-semibold text-sm">Skip for now</Text>
            </TouchableOpacity>
          </View>

          <View className="py-6 items-center opacity-40">
            <Text className="text-xs font-medium tracking-widest uppercase text-on-surface">Step 2 of 4 • Member Access</Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
