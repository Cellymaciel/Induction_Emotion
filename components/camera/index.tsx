import { Button, View, Text, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";


type Emotion = 'happy' | 'sad' | 'angry' | 'neutral' | 'surprise' | 'fear' | 'disgust';


interface CameraProps {
     isCameraActive: boolean; 
    onEmotionDetected: (emotionData: { emotion: Emotion; time: string; videoId: number|string }) => void;
    currentVideoId: number|string;
}
export function Camera({ onEmotionDetected, currentVideoId, isCameraActive }: CameraProps){
   const [permissions, setPermissions] = useCameraPermissions()
    const cameraRef = useRef<CameraView|null>(null)
    const [isProcessing, setProcessing] = useState<Boolean>(false)
    const intervalRef = useRef<NodeJS.Timeout | number | null>(null)
    const [emotion, setEmotion] = useState<Emotion>('neutral')
        const [responseTimes, setResponseTimes] = useState<number[]>([]);


  useEffect(() => {
        if (permissions && permissions.granted && isCameraActive) {
            console.log("Câmera está ativa. Iniciando captura.");
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            intervalRef.current = setInterval(() => {
                captureImage();
            }, 3000);
        } else {
            if (intervalRef.current) {
                console.log("Câmera desativada. Parando captura.");
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [permissions, isCameraActive]);

    const captureImage = async() => {
        console.log("Entrou na função de captura.")
        if(!cameraRef.current || isProcessing){
            console.log('Camera não está pronta ou processando.')
            return;
        }
        console.log('Iniciando Captura')
        setProcessing(true)
        try{
            const options = {
                quality:0.5,
                base64:true,
                skipProcessing : true
            }
            const data = await cameraRef.current.takePictureAsync(options);
            if(data?.uri){
                console.log('Imagem Capturada: ', data.uri)
                const resizeImage = await manipulateAsync(
                    data.uri,[
                        {resize:{width:224,height:224}}
                    ],
                    {format: SaveFormat.JPEG, base64:true}
                );
                if(resizeImage.base64){
                    const start = Date.now();
                    const response = await axios.post('http://192.168.15.24:5000/recognize', {
                        image : resizeImage.base64
                    });
                    const end = Date.now();
                    const duration = end - start;

                  setResponseTimes(prev => {
                    const updated = [...prev, duration];
                    const sum = updated.reduce((a, b) => a + b, 0);
                    const avg = sum / updated.length;
                    console.log(`Tempo de resposta: ${duration} ms`);
                    console.log(`Tempo médio de resposta ate o momento: ${avg.toFixed(2)} ms`);
                    return updated;
                  });
                    if (response.data.emotion) {
                        console.log("emotion dominate : ",response.data)
                        setEmotion(response.data.emotion);
                        onEmotionDetected({
                            emotion: response.data.emotion,
                            time: new Date().toISOString(),
                            videoId: currentVideoId
                        });
                    }
                }
            }
        }
         catch(error){
        if (axios.isAxiosError(error) && error.response) {
          console.log('Erro do servidor:', error.response.status);
          console.log('Dados do erro:', error.response.data);
        } else if (axios.isAxiosError(error) && error.request) {
          console.log('Erro de rede: O servidor não respondeu.');
        } else {
          console.log('Erro de reconhecimento de emoção:', error);
        }
    }finally{
        setProcessing(false)
    }
}
    


  
    if(!permissions){
        return<View/>
    }
    if(!permissions.granted){
      return (
        <View>
             <Text>Precisamos da sua permissão</Text>
             <Button onPress={setPermissions} title="Aceitar"/>
        </View>
      )
    }

    return(
        <View>
          {isCameraActive && permissions?.granted ? (
                <CameraView
                    ref={cameraRef}
                    facing="front"
                    style={s.camera}
                >
                    <View></View>
                </CameraView>
            ) : (
                <View style={{ flex: 1 }} />
            )}
        </View>
    )
}



const s = StyleSheet.create({
    camera:{
     position: 'absolute',
        left: -9999,
        top: -9999,
        width: 1,
        height: 1,
         zIndex: 1,
        opacity: 0,
    }
})