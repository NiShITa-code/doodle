import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Your Friends on your Home Screen',
    description: 'Doodle Bound is a live social whiteboard. When your friends draw in the app, it instantly updates the Widget on your iPhone home screen.',
    icon: 'widgets',
    color: '#a7295a'
  },
  {
    id: '2',
    title: 'Drop Photos & Draw over Reality',
    description: 'Snap a live photo and drop it into the canvas. Your squad can doodle over it, leave notes, and add emojis together in real-time.',
    icon: 'photo-camera',
    color: '#ff4b82'
  },
  {
    id: '3',
    title: 'Couples & Squads',
    description: 'Create an intimate canvas just for you and your partner, or start a chaotic group room with your 5 best friends. The choice is yours.',
    icon: 'volunteer-activism',
    color: '#fdd34d' // yellow
  }
];

export default function WalkthroughScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const navigation = useNavigation();

  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    if (index >= 0) {
      setCurrentIndex(Math.round(index));
    }
  };

  const completeWalkthrough = async () => {
    await AsyncStorage.setItem('@doodle_bound_seen_onboarding', 'true');
    navigation.replace('Login');
  };

  const goNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({ x: (currentIndex + 1) * width, animated: true });
    } else {
      completeWalkthrough();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        className="flex-1"
      >
        {SLIDES.map((slide, i) => (
          <View key={slide.id} style={{ width, height: height * 0.8 }} className="items-center justify-center px-8 pb-20">
            
            {/* Visual Icon Mockup */}
            <View className="mb-14 relative items-center justify-center">
               <View className="absolute w-48 h-48 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: slide.color }} />
               <View 
                 className="w-40 h-40 rounded-3xl items-center justify-center shadow-2xl border border-white/20"
                 style={{ backgroundColor: slide.id === '3' ? '#111' : slide.color }}
               >
                  <MaterialIcons name={slide.icon} size={70} color={slide.id === '3' ? slide.color : 'white'} />
               </View>
            </View>

            <Text className="text-3xl font-extrabold text-white text-center mb-4 tracking-tight">{slide.title}</Text>
            <Text className="text-gray-400 text-center font-medium text-lg leading-6">{slide.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Footer Controls */}
      <View className="absolute bottom-12 w-full px-8 flex-row justify-between items-center z-50">
        
        {/* Pagination Dots */}
        <View className="flex-row gap-2">
          {SLIDES.map((_, i) => (
             <View 
               key={i} 
               className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/30'}`} 
             />
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity 
          onPress={goNext}
          className="px-8 py-4 rounded-full shadow-lg flex-row items-center gap-2"
          style={{ backgroundColor: SLIDES[currentIndex].color }}
        >
           <Text className={`font-extrabold text-lg ${currentIndex === 2 ? 'text-black' : 'text-white'}`}>
             {currentIndex === SLIDES.length - 1 ? "Let's Go" : "Next"}
           </Text>
           <MaterialIcons name="arrow-forward" size={20} color={currentIndex === 2 ? 'black' : 'white'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
