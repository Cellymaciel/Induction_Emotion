import { View, Text } from "react-native";
import { VideoList } from "@/components/VideoList";
import { Header } from "@/components/headers/header";
import { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";


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

const emotionMap = {
    happy: 'Alegria', 
    sad: 'Tristeza',
    angry: 'Raiva',
    neutral: 'Neutro',
    surprise: 'Surpresa',
};

export default function Inducing(){
 const searchParams = useLocalSearchParams();

  const emotionInductionParam = Array.isArray(searchParams?.emotionInduction)
    ? searchParams.emotionInduction[0]
    : searchParams?.emotionInduction;

  const videosParam = Array.isArray(searchParams?.videos)
    ? searchParams.videos[0]
    : searchParams?.videos;



   const [videosToPlay, setVideosToPlay] = useState<any[]>([]);
    const [emocaoEscolha, setEmocaoEscolha] = useState<string>("");
    const [detectedEmotions, setDetectedEmotions] = useState<EmotionData[]>([]);

   useEffect(() => {
        let parsedVideos: VideoItem[] = [];
        let chosenEmotion = "";

        if (typeof videosParam === "string") {
            try {
                parsedVideos = JSON.parse(videosParam);
            } catch (e) {
                console.error("Erro ao decodificar a lista de vídeos:", e);
                parsedVideos = [];
            }
        }
        setVideosToPlay(parsedVideos);

        if (emotionInductionParam && emotionMap[emotionInductionParam as keyof typeof emotionMap]) {
            chosenEmotion = emotionMap[emotionInductionParam as keyof typeof emotionMap];
        }  else if (emotionInductionParam === 'custom') { 
             chosenEmotion = "Videos da Galeria";
        }else {
            chosenEmotion = "";
        }

        setEmocaoEscolha(chosenEmotion);
    }, [emotionInductionParam, videosParam]);

  const handleEmotionDetected = useCallback((emotionData: EmotionData) => {
    setDetectedEmotions((prevEmotions) => [...prevEmotions, emotionData]);
  }, []);
    return(
        <View style={{padding:15}}>
            <Header/>
            <VideoList
                videos={videosToPlay}
                onEmotionDetected={handleEmotionDetected}
                emocaoEscolha={emocaoEscolha}
            />
            
        </View>
    );
}