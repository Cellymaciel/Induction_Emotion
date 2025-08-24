import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet , Text} from 'react-native';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { videoHappy } from '@/assets/videos/happyData';
import { router, useNavigation } from 'expo-router';
import { getUserEmail } from '@/utils/infos';
import { Camera } from '../camera';
import { configs } from '@/utils/configs';
import { useLocalSearchParams } from 'expo-router/build/hooks';

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
      videos: VideoItem[];
}

const VideoList: React.FC<VideoListProps> = ({ emocaoEscolha, onEmotionDetected, videos }) => {
    const videoRef = useRef<Video | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [detectedEmotions, setDetectedEmotions] = useState<EmotionData[]>([]);
    const searchParams = useLocalSearchParams()
    const {  emotionInduction} = searchParams
    const expectedEmotion = useLocalSearchParams(); 
       const [isLoadingVideo, setIsLoadingVideo] = useState(true);

    const currentVideos = videos;
    const activeVideos = videos && videos.length > 0 ? videos : videoHappy as VideoItem[];


    console.log('emoção na tela de inducao: ', emotionInduction)

    useEffect(() => {
        setStartTime(new Date());
    }, []);
    const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if ('isLoaded' in status && status.isLoaded && 'didJustFinish' in status && status.didJustFinish && !status.isLooping) {
            handleVideoEnd();
        }
    };  
  const handleVideoEnd = async () => {
    const storedEmail = await getUserEmail(null);
    getUserEmail(storedEmail);

    // NOVO: Use `activeVideos.length` para a verificação
    if (currentIndex < activeVideos.length - 1) {
        console.log("Próximo vídeo:", currentIndex + 1);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
        // TODOS OS VÍDEOS TERMINARAM
        console.log("Todos os vídeos foram reproduzidos.");
        if (storedEmail && startTime) {
            const inducingData = {
                dataInicio: startTime.toISOString(),
                emocaoEscolha: emotionInduction,
                // CORRIGIDO: Use a lista de emoções detectadas
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
    }
};


    const addDetectedEmotion = (emotionData: { emotion: EmotionData['emotion']; time: string }) => {
        const videoId = currentVideos[currentIndex]?.id ?? 0;
        const emotion: EmotionData = {
            ...emotionData,
            videoId,
        };
        setDetectedEmotions((prevEmotions) => [...prevEmotions, emotion]);
    };

 
    const currentVideo = activeVideos[currentIndex];
    return (
        <View style={styles.container}>
            <Video
                ref={videoRef}
                source={currentVideo.uri}
                style={styles.video}
                useNativeControls
                shouldPlay
                resizeMode={ResizeMode.COVER}
                isLooping={false}
                 onPlaybackStatusUpdate={handlePlaybackStatusUpdate} 
                            />
       
                <Camera
                    onEmotionDetected={addDetectedEmotion} 
                    currentVideoId={currentVideos[currentIndex]?.id}
                />
        
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

export { VideoList};