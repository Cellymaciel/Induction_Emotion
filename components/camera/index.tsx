import { Button, View, Text } from "react-native";
import { CameraView , useCameraPermissions, CameraType} from "expo-camera"
import React, { useRef, useState } from "react";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import axios from "axios";
import { useFocusEffect } from "expo-router";


type Emotion = 'happy' | 'sad' | 'angry' | 'neutral' | 'surprise' | 'fear' | 'disgust';

export function Camera (){
    const [ permissions, setPermissions] = useCameraPermissions()
    const cameraRef = useRef<CameraView|null>(null)
    const [isProcessing, setProcessing] = useState<Boolean>(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const [isCapturing, setCapturing] = useState<Boolean>(false)
    const [emotion, setEmotion] = useState<Emotion>('neutral')

    const captureImaege = async() => {
        if(!cameraRef.current || isProcessing){
            console.log('Camera não esta pronta')
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
                    const response = await axios.post('http://192.168.5.9:5000/recognize', {
                        image : resizeImage.base64
                    });
                    if(response.data.emotion){
                        console.log("emoção detectada : ", response.data.emotion)
                        setEmotion(response.data.emotion)
                    }
                }
            }
        }
        catch(error){
            console.log('Erro de reconhecimento de emoção : ' , error)
        }finally{
            setProcessing(false)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            setCapturing(true);
            intervalRef.current = setInterval(() => {
                if(!isProcessing && isCapturing){
                    console.log('imagem cpturada')
                    captureImaege()
                }
            }, 4000);
            return() => {
                if(intervalRef.current){
                    clearInterval(intervalRef.current)
                }
                setCapturing(false)
            }
        }, [isProcessing, isCapturing])
    )

    if(!permissions){
        return<View/>
    }
    if(!permissions.granted){
        <View>
            <Text>Precisamos da sua permissão</Text>
            <Button onPress={setPermissions} title="Aceitar"/>
        </View>
    }

    return(
        <View>
            <CameraView ref={cameraRef} facing="front">

            </CameraView>

        </View>
    )
}