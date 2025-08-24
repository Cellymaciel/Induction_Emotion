import { View, Text } from "react-native";
import { VideoList } from "@/components/VideoList";
import { Header } from "@/components/headers/header";
import { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";


interface EmotionData {
    emotion: 'happy' | 'sad' | 'angry' | 'neutral' | 'surprise' | 'fear' | 'disgust';
    time: string;
    videoId: number;
}

const emotionMap = {
    happy: 'Alegria', 
    sad: 'Tristeza',
    angry: 'Raiva',
    neutral: 'Neutro',
    surprise: 'Surpresa',
    videosSelect: 'Videos da Galeria', 
};

export default function Inducing(){
    const searchParams = useLocalSearchParams()
    const emotionInduction = (searchParams.emotionInduction || null) as keyof typeof emotionMap | null;
    const selectedVideoUris = searchParams.videos;
    const videosFromGallery: string[] | null = typeof selectedVideoUris === "string" ? JSON.parse(selectedVideoUris) : null;
    const [videosToPlay, setVideosToPlay] = useState<any[]>([]);
    const [emocaoEscolha, setEmocaoEscolha] = useState<string>("");
    const [detectedEmotions, setDetectedEmotions] = useState<EmotionData[]>([]);

  useEffect(() => {
        if (emotionInduction === "videosSelect" && selectedVideoUris) {
            try {
                const parsedVideos: string[] = typeof selectedVideoUris === "string" ? JSON.parse(selectedVideoUris) : [];
                const videoData = parsedVideos.map((uri, index) => ({
                    id: index,
                    uri: uri, 
                    expectedEmotion: "user_selected"
                }));
                setVideosToPlay(videoData);
            } catch (e) {
                console.error("Erro ao processar URIs da galeria:", e);
                setVideosToPlay([]);
            }
        } else {
         
            setVideosToPlay([]);
        }
        setEmocaoEscolha(emotionInduction ? emotionMap[emotionInduction] : "");
    }, [emotionInduction, selectedVideoUris]);

    const handleEmotionDetected = useCallback((emotionData: EmotionData) => {
        setDetectedEmotions((prevEmotions) => [...prevEmotions, emotionData]);
    }, []);

    return(
        <View style={{padding:15}}>
            <Header/>
 {videosToPlay ? (
                <VideoList
                    videos={videosToPlay} 
                    onEmotionDetected={handleEmotionDetected}
                    emocaoEscolha={emocaoEscolha}
                />
            ) : (
                <VideoList
                        onEmotionDetected={handleEmotionDetected}
                        emocaoEscolha={emocaoEscolha} videos={[]}                />
            )}      
             <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
            </Text>
              </View>
    )
}