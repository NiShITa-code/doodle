import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Dimensions, Share, ActivityIndicator, Modal, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import ViewShot from 'react-native-view-shot';
import DrawingCanvas from '../components/DrawingCanvas';
import { supabase } from '../lib/supabase';
import { getSession } from '../lib/auth';
import { getMyCanvases, createNewCanvas, joinCanvas } from '../lib/canvases';

const { width } = Dimensions.get('window');

export default function SwipeableCanvasScreen() {
  const [session, setSession] = useState(null);
  const [canvases, setCanvases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liveElements, setLiveElements] = useState({});
  const channelRef = useRef(null);
  const viewShotRefs = useRef({});
  const route = useRoute();

  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [activeCanvasId, setActiveCanvasId] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      const userSession = await getSession();
      setSession(userSession);

      if (route.params?.canvasId) {
        await joinCanvas(route.params.canvasId);
      }

      const myLiveCanvases = await getMyCanvases();
      setCanvases(myLiveCanvases);

      // Fetch existing elements from DB (Optional: currently we assume realtime only for speed, but ideally we fetch here)
      // supabase.from('canvas_elements').select('*').in('canvas_id', myLiveCanvases.map(c=>c.id)).then(...)

      setLoading(false);
    };
    initialize();

    // Supabase Channel (Realtime Sync)
    const channel = supabase.channel('doodle_bound_canvas', {
      config: { broadcast: { ack: false } }
    });
    // Listen for new elements
    channel.on('broadcast', { event: 'new_element' }, (payload) => {
      const { canvasId, element } = payload.payload;
      setLiveElements(prev => ({
        ...prev,
        [canvasId]: [...(prev[canvasId] || []), element]
      }));
    });
    // Listen for status beacon updates
    channel.on('broadcast', { event: 'update_status' }, (payload) => {
      const { canvasId, beacon } = payload.payload;
      setCanvases(prev => prev.map(c => c.id === canvasId ? { ...c, beacon } : c));
    }).subscribe();

    channelRef.current = channel;

    return () => { supabase.removeChannel(channel); };
  }, [route.params]);

  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    if (index >= 0) { setCurrentIndex(Math.round(index)); }
  };

  const onElementAdded = (canvasId, element) => {
    setLiveElements(prev => ({ ...prev, [canvasId]: [...(prev[canvasId] || []), element] }));
    
    // Save element to DB
    supabase.from('canvas_elements').insert({ canvas_id: canvasId, type: element.type, payload: element })
      .then(() => console.log('Element saved'))
      .catch(e => console.log(e));

    // Broadcast Realtime
    if (channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'new_element',
        payload: { canvasId, element }
      }).catch(err => console.log('Broadcast error:', err));
    }

    // Capture Widget Snapshot & Upload to Supabase!
    setTimeout(() => {
      if (viewShotRefs.current[canvasId]) {
        viewShotRefs.current[canvasId].capture().then(b64 => {
          supabase.from('canvas_snapshots').upsert({ 
            canvas_id: canvasId, 
            snapshot_base64: b64, 
            updated_at: new Date().toISOString() 
          }).then(() => console.log('Widget snapshot synced!'));
        }).catch(err => console.log('Screenshot failed:', err));
      }
    }, 500); // Small delay to let the UI finish painting the new element
  };

  const executeCreateCanvas = async (type) => {
    setShowCreateModal(false);
    const newCanvas = await createNewCanvas(session?.name || 'My', type);
    setCanvases([newCanvas, ...canvases]);
  };

  const openStatusModal = (canvasId) => {
    setActiveCanvasId(canvasId);
    setStatusText('');
    setShowStatusModal(true);
  };

  const saveStatus = () => {
    if (!activeCanvasId) return;
    
    // Update locally
    setCanvases(prev => prev.map(c => c.id === activeCanvasId ? { ...c, beacon: statusText } : c));
    setShowStatusModal(false);

    // Broadcast
    if (channelRef.current && statusText.length > 0) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'update_status',
        payload: { canvasId: activeCanvasId, beacon: statusText }
      });
    }
  };

  const handlePickImage = async (canvasId) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      // Create an image element centered on screen
      const newImageElement = {
        type: 'image',
        uri: asset.uri,
        width: 200,
        height: 200 * (asset.height / asset.width), // preserve ratio
        x: (width - 200) / 2, // Centered X
        y: 200, // Top-centered Y
        id: Math.random().toString(36).substring(7)
      };
      onElementAdded(canvasId, newImageElement);
    }
  };

  const handleShareInvite = async (canvasId) => {
    const deepLink = `doodlebound://invite/${canvasId}`;
    try {
      await Share.share({
        message: `${session?.name} wants to draw on your Home Screen! Tap to join their Canvas: ${deepLink}`
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: async () => {
          await import('../lib/auth').then(m => m.logout());
        }
      }
    ]);
  };

  const showProfile = () => {
    navigation.navigate('Profile');
  };

  if (loading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size="large" color="#a7295a" />
      </View>
    );
  }

  // To maintain the grid, we always ensure there is at least 1 empty spot to invite someone if they have less than 5.
  const displayPages = [...canvases];
  if (displayPages.length < 5) {
    displayPages.push({ id: 'invite-placeholder', isEmpty: true });
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Top HUD */}
      <View pointerEvents="box-none" className="absolute top-14 w-full px-6 flex-row justify-between items-center z-50">
        <TouchableOpacity pointerEvents="auto" onPress={showProfile} className="flex-row items-center gap-2">
          <View className="w-10 h-10 bg-black/80 rounded-full items-center justify-center border border-white/20">
            <MaterialIcons name="person" size={20} color="white" />
          </View>
        </TouchableOpacity>
        
        <View className="flex-row gap-2 bg-black/80 px-4 py-2 rounded-full border border-white/20">
          {displayPages.map((_, i) => (
            <View key={i} className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/30'}`} style={{transform: i===currentIndex ? [{scale: 1.25}] : []}} />
          ))}
        </View>

        <TouchableOpacity pointerEvents="auto" onPress={handleLogout} className="w-10 h-10 bg-black/80 rounded-full items-center justify-center border border-white/20">
            <MaterialIcons name="logout" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onMomentumScrollEnd={handleScroll} className="flex-1" bounces={false}>
        {displayPages.map((page, index) => (
          <View key={page.id} style={{ width }} className="flex-1 justify-center items-center relative bg-[#1e1e1e]">
            
             {page.isEmpty ? (
              <View pointerEvents="box-none" className="flex-1 w-full justify-center items-center px-6">
                <View className="w-24 h-24 rounded-full border-2 border-dashed border-[#555] items-center justify-center mb-6 bg-[#333]">
                  <MaterialIcons name="add" size={40} color="white" />
                </View>
                <Text className="text-2xl font-extrabold text-white text-center mb-2">{canvases.length === 0 ? "Start a Connection" : "Invite a Friend"}</Text>
                <Text className="text-gray-400 text-center font-medium mb-8">
                  Create a new canvas and claim a spot on their Home Screen.
                </Text>
                <TouchableOpacity onPress={() => setShowCreateModal(true)} className="py-4 px-8 rounded-full bg-[#fdd34d] shadow-lg flex-row items-center gap-2">
                  <MaterialIcons name="add-circle" size={20} color="black" />
                  <Text className="text-black font-extrabold text-lg">Create New Canvas Room</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View pointerEvents="box-none" className="flex-1 w-full relative">
                {/* Freeform Canvas Context */}
                <View pointerEvents="box-none" className="absolute inset-0 z-10">
                  <ViewShot ref={(ref) => viewShotRefs.current[page.id] = ref} options={{ format: "jpg", quality: 0.8, result: "base64" }} style={{ flex: 1 }}>
                    <DrawingCanvas 
                      elements={liveElements[page.id] || []}
                      activeColor={page.color || '#a7295a'} 
                      activeWidth={8} 
                      onElementAdded={(el) => onElementAdded(page.id, el)} 
                    />
                  </ViewShot>
                </View>

                {/* Ambient Beacon Overlay */}
                {page.beacon && (
                  <View pointerEvents="none" className="absolute top-[25%] left-1/2 ml-[-100px] w-[200px] bg-white/90 px-5 py-3 rounded-2xl shadow-sm flex-row gap-2 items-center justify-center z-20" style={{transform:[{rotate:'-3deg'}]}}>
                    <MaterialIcons name="location-pin" size={18} color={page.color || '#a7295a'} />
                    <Text className="font-extrabold text-[#492138] text-sm text-center">{page.beacon}</Text>
                  </View>
                )}

                {/* Bottom Canvas Tools */}
                <View pointerEvents="box-none" className="absolute bottom-12 w-full px-6 z-30">
                  <View pointerEvents="box-none" className="flex-row items-center justify-between w-full mb-8 max-w-sm mx-auto px-4">
                    
                    {/* Share Button */}
                    <TouchableOpacity pointerEvents="auto" onPress={() => handleShareInvite(page.id)} className="w-14 h-14 bg-black/80 rounded-full items-center justify-center border border-white/40 shadow-sm">
                      <MaterialIcons name="person-add" size={28} color="white" />
                    </TouchableOpacity>
                    
                    {/* Camera Button */}
                    <TouchableOpacity pointerEvents="auto" onPress={() => handlePickImage(page.id)} className="w-16 h-16 bg-white rounded-full items-center justify-center shadow-xl border-4 border-black">
                      <MaterialIcons name="photo-camera" size={28} color="black" />
                    </TouchableOpacity>

                    {/* Tools Tray */}
                    <View pointerEvents="auto" className="flex-row items-center gap-3 bg-black/80 px-3 py-2.5 rounded-full border border-white/40">
                      <TouchableOpacity onPress={() => openStatusModal(page.id)} className="w-8 h-8 rounded-full border border-white/80 bg-black items-center justify-center shadow-sm">
                         <MaterialIcons name="add-comment" size={16} color="white" />
                      </TouchableOpacity>
                      <View className="w-[1px] h-6 bg-white/30" />
                      <TouchableOpacity className="w-8 h-8 rounded-full border-2 border-white/80" style={{backgroundColor: page.color || '#a7295a'}} />
                      <TouchableOpacity className="w-5 h-5 rounded-full border-2 border-white/40 bg-white" />
                    </View>
                  </View>

                  <View className="items-center" pointerEvents="none">
                    <Text className="text-white font-bold text-xs uppercase tracking-widest bg-black/80 border border-white/20 px-5 py-2.5 rounded-full overflow-hidden shadow-sm">
                      {page.name}
                    </Text>
                  </View>
                </View>

              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* CREATE MODAL */}
      <Modal visible={showCreateModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/60">
          <View className="bg-[#1e1e1e] rounded-t-3xl p-6 items-center w-full">
            <View className="w-12 h-1 bg-gray-600 rounded-full mb-6" />
            <Text className="text-2xl font-extrabold text-white mb-2">Create Canvas</Text>
            <Text className="text-gray-400 mb-8 text-center">Who is this canvas for?</Text>
            
            <TouchableOpacity onPress={() => executeCreateCanvas('couple')} className="w-full bg-[#ff4b82] p-5 rounded-3xl mb-4 flex-row items-center">
               <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-4">
                  <MaterialIcons name="favorite" size={24} color="white" />
               </View>
               <View>
                 <Text className="text-white font-extrabold text-xl">Couple Canvas</Text>
                 <Text className="text-white/80">Just the two of us.</Text>
               </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => executeCreateCanvas('group')} className="w-full bg-[#a7295a] p-5 rounded-3xl mb-8 flex-row items-center">
               <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-4">
                  <MaterialIcons name="groups" size={24} color="white" />
               </View>
               <View>
                 <Text className="text-white font-extrabold text-xl">Group Canvas</Text>
                 <Text className="text-white/80">Up to 5 friends.</Text>
               </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setShowCreateModal(false)} className="w-full py-4">
               <Text className="text-gray-400 font-bold text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* STATUS BEACON MODAL */}
      <Modal visible={showStatusModal} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/80 px-6">
          <View className="bg-white rounded-3xl p-6 w-full max-w-sm">
            <Text className="text-xl font-extrabold text-[#492138] mb-4 text-center">Set Your Status</Text>
            <TextInput 
              value={statusText}
              onChangeText={setStatusText}
              placeholder="e.g. At the library"
              placeholderTextColor="#999"
              autoFocus
              className="bg-gray-100 p-4 rounded-xl text-lg font-bold text-black border border-gray-200 mb-6"
            />
            <View className="flex-row gap-4">
              <TouchableOpacity onPress={() => setShowStatusModal(false)} className="flex-1 p-4 rounded-xl bg-gray-200 items-center">
                <Text className="font-bold text-gray-700">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveStatus} className="flex-1 p-4 rounded-xl bg-[#a7295a] items-center">
                <Text className="font-bold text-white">Broadcast</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
