import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CollectiveCanvasScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#fff4f6]">
      <View className="flex-1 px-4 pt-4 pb-8 max-w-2xl mx-auto w-full">
        
        {/* Top Bar: Participants */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm border border-[#d59db9]/20">
            <MaterialIcons name="close" size={24} color="#7b4d66" />
          </TouchableOpacity>
          
          <View className="flex-row items-center bg-white px-4 py-2 rounded-full shadow-sm border border-[#d59db9]/20">
            <View className="flex-row -space-x-2 mr-3 opacity-90">
              <View className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                <Image source={{uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDg91w91tvR7LgCb-9WuW-MOhL_GI6257NiSHPpWsDUlQZlwEzmf4eDH-DNTMcFmhspMXcjj4-B_ZtoQCuxfj0R4TNykOofI4hH3J4LzRXCFmC1bxxqmg7neDUYl4S5x0PyJFO1aSJHyCtmEFKcfFyF8RuabgZ9QrF7UEO_CdPAzmsePlUDhVYUkbHC-YYes-TNJ4LCWGou_KHaf5_yW3-htH_cSnHsrToLF1UVB6SEy5MWxQ5ddmybm-EoxbUiifPjmV2wzstvrjM"}} className="w-full h-full" />
              </View>
              <View className="w-8 h-8 rounded-full border-2 border-white z-10 overflow-hidden bg-gray-200">
                <Image source={{uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuD05BPXtVZN4x48UnuEN__JxnCHt9JBdOoKHuCj4o3ZpTUfWCNClkeJiHXhZam9l076gqPjvzhMkVMuk1xHswh2borXiPfCNUWpOd4DeAw61VoBhxqKL0oAJ70pU9a1CGvLGZRS6drIN3W4ULhbRLrp5F5mj1E4iyaOTwm4-mSyRsLibAkpQH6oz-6g0USjZMhRhQTBd7jCX-DQkaeL0aE-mOmy36KOhMcMpG8bxjS2z1KV-TDnBnox4nNbh-wSVJ7oc71RPMxQhlE"}} className="w-full h-full" />
              </View>
            </View>
            <Text className="font-bold text-[#492138] text-sm">You & Elena</Text>
            <View className="w-2 h-2 rounded-full bg-[#a7295a] ml-2 shadow-md" />
          </View>

          <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm border border-[#d59db9]/20">
            <MaterialIcons name="share" size={24} color="#7b4d66" />
          </TouchableOpacity>
        </View>

        {/* Canvas Area */}
        <View className="flex-1 bg-white rounded-3xl shadow-inner border border-[#d59db9]/20 relative overflow-hidden mb-6 w-full">
          {/* Faint Grid Background approximation for RN */}
          <View className="absolute inset-0 bg-transparent flex-row flex-wrap opacity-5">
            {/* React Native doesn't support repeating structural gradients easily without SVG, so leaving translucent background */}
            <View className="w-full h-full bg-[#492138] opacity-10" />
          </View>

          {/* Doodle Layer Placeholder */}
          <View className="absolute inset-0 items-center justify-center opacity-80 z-10">
            <MaterialIcons name="gesture" size={280} color="#a7295a" style={{opacity: 0.7}} />
            
            {/* "Live" Cursor indicator for friend */}
            <View className="absolute top-[40%] right-[30%] items-center flex-row">
              <MaterialIcons name="edit" size={16} color="#705900" style={{transform:[{rotate:'180deg'}]}} />
              <View className="bg-[#fdd34d] px-2 py-0.5 rounded-full shadow-sm ml-1">
                <Text className="text-[10px] font-bold text-[#5c4900]">Elena</Text>
              </View>
            </View>
          </View>

          {/* Widget Preview Mini-Overlay */}
          <View className="absolute bottom-4 left-4 bg-[#ffd8e9]/90 px-4 py-2 rounded-full border border-white/40 flex-row items-center gap-2 shadow-sm z-20">
            <MaterialIcons name="widgets" size={16} color="#a7295a" />
            <Text className="text-[#a7295a] font-bold text-xs uppercase tracking-widest">Live on Widget</Text>
          </View>
        </View>

        {/* Tools Dashboard */}
        <View className="bg-white rounded-3xl p-4 shadow-lg border border-[#d59db9]/10 w-full mb-4">
          <View className="flex-row justify-between items-center">
            
            {/* Brushes */}
            <View className="flex-row items-center gap-1 bg-[#fff4f6] p-1.5 rounded-2xl">
              <TouchableOpacity className="w-12 h-12 bg-white rounded-xl shadow-sm items-center justify-center border border-[#d59db9]/20">
                <MaterialIcons name="edit" size={24} color="#a7295a" />
              </TouchableOpacity>
              <TouchableOpacity className="w-12 h-12 rounded-xl items-center justify-center">
                <MaterialIcons name="brush" size={24} color="#7b4d66" />
              </TouchableOpacity>
              <TouchableOpacity className="w-12 h-12 rounded-xl items-center justify-center">
                <MaterialIcons name="format-color-fill" size={24} color="#7b4d66" />
              </TouchableOpacity>
            </View>

            {/* Colors */}
            <View className="flex-row items-center gap-2 px-1">
              <TouchableOpacity className="w-8 h-8 rounded-full bg-[#a7295a] shadow-sm transform scale-110 border-[3px] border-[#ffd0e6]" />
              <TouchableOpacity className="w-8 h-8 rounded-full border-2 border-white bg-[#492138] shadow-sm transform scale-90" />
              <TouchableOpacity className="w-8 h-8 rounded-full border-2 border-white bg-[#eec540] shadow-sm transform scale-90" />
              <TouchableOpacity className="w-8 h-8 rounded-full border-2 border-white bg-[#fcbcff] shadow-sm transform scale-90" />
            </View>

          </View>

          {/* Secondary Actions */}
          <View className="flex-row justify-between items-center mt-4 px-2">
            <View className="flex-row gap-4">
              <TouchableOpacity>
                <MaterialIcons name="undo" size={28} color="#d59db9" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="redo" size={28} color="#d59db9" />
              </TouchableOpacity>
            </View>
            <View className="flex-row gap-4">
              <TouchableOpacity className="w-10 h-10 bg-[#ffecf3] rounded-full justify-center items-center border border-[#d59db9]/20">
                <Text className="text-[#a7295a] font-bold text-xl">A</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 bg-[#ffecf3] rounded-full justify-center items-center border border-[#d59db9]/20">
                <MaterialIcons name="add-photo-alternate" size={20} color="#a7295a" />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 bg-[#ffecf3] rounded-full justify-center items-center border border-[#d59db9]/20">
                <MaterialIcons name="delete-outline" size={20} color="#a7295a" />
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}
