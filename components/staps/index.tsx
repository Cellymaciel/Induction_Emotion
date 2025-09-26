import { Ionicons } from "@expo/vector-icons"
import { ScrollViewComponent, Text, View} from "react-native"
import { Stap } from "../stap"
import { style_staps } from "./css_index"
import { colors } from "@/constants/Colors"
import { useState } from "react"
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router"
import { videosByEmotion } from "@/assets/videos/videoData"
import * as FileSystem from "expo-file-system";

export function Staps(){

const navigateToInducing = ( emotion: string, videosArray: any[]) =>{
    router.navigate({
        pathname:'/(app)/inducing',
        params:{
            emotionInduction: emotion,
            videos : JSON.stringify(videosArray)
        }
    })
} 

const normalizeUri = (uri: string) => decodeURIComponent(uri);

const ensureFileExists = async (asset: any) => {
  const decodedUri = normalizeUri(asset.uri);
  const fileInfo = await FileSystem.getInfoAsync(decodedUri);

  if (fileInfo.exists) {
    console.log("Arquivo existe:", decodedUri);
    return decodedUri;
  } else {
    console.log("Arquivo NÃO existe, copiando para documentDirectory...");
    const newUri = FileSystem.documentDirectory + (asset.fileName ?? `video-${Date.now()}.mp4`);
    await FileSystem.copyAsync({
      from: asset.uri,
      to: newUri,
    });
    return newUri;
  }
};

    const pickImage = async () =>{

        try{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['videos'],
                videoQuality:1,
                allowsMultipleSelection:true
            });
           
            console.log(result);
          if (!result.canceled && result.assets?.length > 0) {
      const selectedVideos: any[] = [];

      for (let index = 0; index < result.assets.length; index++) {
        const asset = result.assets[index];
        const safeUri = await ensureFileExists(asset);

        selectedVideos.push({
          id: index,
          uri: { uri: safeUri },  
          expectedEmotion: 'custom',
        });
      }
                navigateToInducing('custom', selectedVideos);
            } else {
            console.log("Seleção de vídeo cancelada.");
            }

        }catch (error) {
      console.error("Erro ao selecionar vídeo:", error);
    }


    }

    return(

        <View style={style_staps.container}>
            <View style={style_staps.box_txt_icon}>
                <Text style={style_staps.txt}>Escolha qual emoção deseja induzir : </Text>
                <View style={style_staps.box_txt_icon}>
                    <Ionicons name="filter-outline" color={colors.Black} size={28}/>
                </View>
            </View>
            <Stap
                imagem="tristeza"
                title="Tristeza"
                description="Sequência de videos tristes"
                screenName="inducing"
                onPress={()=> navigateToInducing('sad', videosByEmotion.sad)}
            />
            <Stap
                imagem="alegria"
                title="Alegre"
                description="Sequência de videos alegres"
                screenName="inducing"
                onPress={()=> navigateToInducing('happy', videosByEmotion.happy)}
            />
            <Stap
                imagem="raiva"
                title="Raiva"
                description="Sequência de videos raivosos"
                screenName="inducing"
                onPress={()=> navigateToInducing('angry', videosByEmotion.angry)}
            />
            <Stap
                imagem="assustado"
                title="Surpresa"
                description="Sequência de videos surpresos"
                screenName="inducing"
                onPress={()=> navigateToInducing('surprise', videosByEmotion.surprise)}

            />
            <Stap
                imagem="calmo"
                title="Neutro"
                description="Sequência de videos neutros"
                screenName="inducing"
                onPress={()=> navigateToInducing('neutral', videosByEmotion.neutral)}
            />
            <Stap
                imagem="photo"
                title="Selecione videos da sua galeria"
                description="Você podera selecionar videos da sua galeria"
                screenName="inducing"
                onPress={pickImage}
            />

        </View>

    )
}