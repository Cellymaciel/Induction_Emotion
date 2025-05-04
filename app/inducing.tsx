import { View, Text } from "react-native";
import { VideoList_Happy } from "@/components/InducingVideos";
import { Header } from "@/components/headers/header";
import { Camera } from "@/components/camera";
import { useCallback, useState } from "react";
import { useSearchParams } from "expo-router/build/hooks";


interface EmotionData {
    emotion: 'happy' | 'sad' | 'angry' | 'neutral' | 'surprise' | 'fear' | 'disgust';
    time: string;
    videoId: number;
}


const emotionMap = {
    1: 'happy',
    2: 'sad',
    3: 'angry',
    4: 'neutral',
    5: 'surprise',
};

export default function Inducing(){
    const searchParams = useSearchParams()
    const   emotionInductionNumber = Number(searchParams.get("emotionInduction")) || NaN;
     const   emocaoEscolha = emotionMap[emotionInductionNumber] || ""; // Converte número para string, ou string vazia se não houver correspondência


    const [detectedEmotions, setDetectedEmotions] = useState<EmotionData[]>([]);

    const handleEmotionDetected = useCallback((emotionData: EmotionData) => {
      
    }, []);

   
    return(
        <View style={{padding:15}}>
            <Header/>
            <VideoList_Happy onEmotionDetected={handleEmotionDetected} emocaoEscolha={emocaoEscolha} />
        </View>
    )
}