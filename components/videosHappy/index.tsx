// src/components/VideoList.tsx
import React, { useRef, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { videoHappy } from '@/assets/videos/happyData';
import { useNavigation } from 'expo-router';




const VideoList_Happy = () => {
  const videoRef = useRef<Video | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation()

  const handleVideoEnd = (status: AVPlaybackStatus) => {
    if (
      status.isLoaded && 
      "didJustFinish" in status && 
      status.didJustFinish && 
      status.positionMillis > 0 
    ) {
        if(currentIndex < videoHappy.length -1){
            setCurrentIndex((prevIndex) => prevIndex+1)
        }else{
            navigation.navigate('analyze_happy')
        }
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={videoHappy[currentIndex].uri}
        style={styles.video}
        useNativeControls
        shouldPlay
        resizeMode={ResizeMode.COVER}
        isLooping={false} 
        onPlaybackStatusUpdate={handleVideoEnd}
      />
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop:10
  },
  video: {
    width: 380,
    height: 700,
    borderRadius: 20,
  },
});

export { VideoList_Happy};