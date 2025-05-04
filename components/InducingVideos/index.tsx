import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { videoHappy } from '@/assets/videos/happyData';
import { useNavigation } from 'expo-router';
import { getUserEmail } from '@/utils/infos';
import { Camera } from '../camera';
import { configs } from '@/utils/configs';
import { useSearchParams } from 'expo-router/build/hooks';

interface EmotionData {
    emotion: 'happy' | 'sad' | 'angry' | 'neutral' | 'surprise' | 'fear' | 'disgust';
    time: string;
    videoId: number;
}

interface VideoItem {
    id: number;
    uri: any;
    expectedEmotion: string;
}

interface VideoListProps {
    emocaoEscolha: string;
    onEmotionDetected: (emotionData: EmotionData) => void;
}

const VideoList_Happy: React.FC<VideoListProps> = ({ emocaoEscolha, onEmotionDetected }) => {
    const videoRef = useRef<Video | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigation = useNavigation();
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [detectedEmotions, setDetectedEmotions] = useState<EmotionData[]>([]);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const searchParams = useSearchParams()
    const {  emotionInduction} = Object.fromEntries(searchParams)
    const expectedEmotion = useSearchParams(); 

    const [currentVideos, setCurrentVideos] = useState<VideoItem[]>([]);

    console.log('emoção na tela de inducao: ', emotionInduction)
    useEffect(() => {
        setStartTime(new Date());
    }, []);

    const handleVideoEnd = async (status: AVPlaybackStatus) => {
        const storedEmail = await getUserEmail();
        setUserEmail(storedEmail);

        if (status.isLoaded && status.didJustFinish && status.positionMillis > 0) {
            if (currentIndex < videoHappy.length - 1) {
                setCurrentIndex((prevIndex) => prevIndex + 1);
            } else {
                if (storedEmail && startTime) {
                    const inducingData = {
                        dataInicio: startTime.toISOString(),
                        emocaoEscolha: emotionInduction,
                        listEmotions: detectedEmotions,
                    };

                    try {
                        const response = await fetch(configs.baseURL + `/inducing/createInducing/` + storedEmail, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(inducingData),
                        });

                        if (!response.ok) {
                          const errorBody = await response.json();
                          console.error('Erro ao salvar a indução:', errorBody);
                          return;
                      }
           
        
                      const responseData = await response.json();
                      console.log('Indução salva com sucesso:', responseData);
                      navigation.navigate('analyze');

                    } catch (error) {
                        console.error('Erro ao enviar a requisição para salvar a indução:', error);
                    }
                } else {
                    console.warn('Email do usuário não encontrado ou tempo de início não definido.');
                    navigation.navigate('analyze');
                }
            }
        }
    };

    const addDetectedEmotion = (emotion: EmotionData) => {
        setDetectedEmotions((prevEmotions) => [...prevEmotions, emotion]);
    };

    return (
        <View style={styles.container}>
            <Video
                ref={videoRef}
                source={(videoHappy as VideoItem[])[currentIndex].uri}
                style={styles.video}
                useNativeControls
                shouldPlay
                resizeMode={ResizeMode.COVER}
                isLooping={false}
                onPlaybackStatusUpdate={handleVideoEnd}
            />
            {currentIndex < videoHappy.length && (
                <Camera
                    onEmotionDetected={addDetectedEmotion} 
                    currentVideoId={videoHappy[currentIndex]?.id}
                />
            )}
        </View>
    );
};

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