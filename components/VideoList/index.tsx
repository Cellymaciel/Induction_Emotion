import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet , Text} from 'react-native';

import { router, useNavigation } from 'expo-router';
import { getUserEmail } from '@/utils/infos';
import { Camera } from '../camera';
import { configs } from '@/utils/configs';
import { VideoView, useVideoPlayer, StatusChangeEventPayload  } from 'expo-video';

interface EmotionData {
    emotion: 'happy' | 'sad' | 'angry' | 'neutral' | 'surprise' | 'fear' | 'disgust';
    time: string;
    videoId: number | string;
}

interface VideoItem {
    id: number | string;
    uri: any;
    expectedEmotion: string;
}

interface VideoListProps {
    emocaoEscolha: string;
    onEmotionDetected: (emotionData: EmotionData) => void;
      videos: VideoItem[];
}
import * as FileSystem from "expo-file-system";




const VideoList: React.FC<VideoListProps> = ({ emocaoEscolha, onEmotionDetected, videos }) => {
    const videoRef = useRef<VideoView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [detectedEmotions, setDetectedEmotions] = useState<EmotionData[]>([]);
    const currentVideo = videos[currentIndex];
    const [isCameraActive, setIsCameraActive] = useState(true);

const player = useVideoPlayer(currentVideo?.uri, (player) => {
  if (currentVideo) {
    player.play();
    player.loop = false;
  }
});


  useEffect(() => {
        const loadAndPlayVideo = async () => {
            if (currentVideo?.uri) {
                const exists = await FileSystem.getInfoAsync(currentVideo.uri);
                if (exists.exists) {
                    player.replace(currentVideo.uri);
                    player.play();
                } else {
                    console.warn("Arquivo de vídeo não encontrado:", currentVideo.uri);
                }
            }
        };

        loadAndPlayVideo();
    }, [currentVideo, player]);

 useEffect(() => {
        setCurrentIndex(0);
        setStartTime(new Date());
    }, [videos]);


useEffect(() => {
        if (!player) return;

        const subscription = player.addListener( 'statusChange', (status: StatusChangeEventPayload) => {
            if (status.status === 'idle' ) {
                if (currentIndex < videos.length - 1) {
                    setCurrentIndex(currentIndex + 1 );
                } else {
                    handleVideoEnd();
                }
            }
        });

        return () => {
            subscription.remove();
        };
    }, [player, currentIndex, videos.length, detectedEmotions]);

   const handleVideoEnd = async () => {
        setIsCameraActive(false);
        const storedEmail = await getUserEmail(null);
        getUserEmail(storedEmail);

         if (storedEmail && startTime) {
            const inducingData = {
                dataInicio: startTime.toISOString(),
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
                    router.navigate('/(app)/analyze')
                } catch (error) {
                    console.error('Erro ao enviar a requisição para salvar a indução:', error);
                }
            } else {
                console.warn('Email do usuário não encontrado ou tempo de início não definido.');
                router.navigate('/(app)/analyze')
            
        }
    };

const addDetectedEmotion = (emotionData: { emotion: EmotionData['emotion']; time: string }) => {
        const videoId = currentVideo?.id;
            if (videoId === undefined) {
            console.warn("videoId is undefined, skipping emotion detection.");
            return;
    }

        const emotion: EmotionData = {
            ...emotionData,
            videoId : videoId,
        };
        setDetectedEmotions((prevEmotions) => [...prevEmotions, emotion]);
    };
 
   if (videos.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nenhum vídeo para exibir.</Text>
            </View>
        );
    }



    return (
        <View style={styles.container}>
   
            <Camera
                onEmotionDetected={addDetectedEmotion}
                currentVideoId={currentVideo?.id}
                isCameraActive={isCameraActive}
            />
            {player &&(
            <VideoView
              ref={videoRef}
              key={currentVideo.id}
              style={styles.video}
              player={player}
              nativeControls
            />
            )}   
        
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    padding: 15,
    marginTop:100
  },
  video: {
    width: 380,
    height: 500,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 20,
    zIndex:0
  },
     emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    emptyText: {
        fontSize: 18,
        color: 'gray',
    },
    can:{
    zIndex: 0
    }
   
});

export { VideoList};

