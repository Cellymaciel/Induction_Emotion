import { Ionicons } from "@expo/vector-icons"
import { ScrollViewComponent, Text, View} from "react-native"
import { Stap } from "../stap"
import { style_staps } from "./css_index"
import { colors } from "@/constants/Colors"
import { useState } from "react"
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router"


export function Staps(){
const [video, setVideo] = useState<String|null>(null) 
    const pickImage = async () =>{


        try{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["videos"],
                videoQuality:1,
                allowsMultipleSelection:true
            });
            if (!result.canceled) {
        const selectedVideoUris = result.assets?.map(asset => asset.uri);
        console.log("Vídeos selecionados:", selectedVideoUris);

        if (selectedVideoUris && selectedVideoUris.length > 0) {
          router.navigate({
            pathname: "/inducing",
            params: {
              emotionInduction: "videosSelect", 
              videos: JSON.stringify(selectedVideoUris) 
            }
          });
        }
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
                emotionInduction="sad"
            />
            <Stap
                imagem="alegria"
                title="Alegre"
                description="Sequência de videos alegres"
                screenName="inducing"
                emotionInduction="happy"
            />
            <Stap
                imagem="raiva"
                title="Raiva"
                description="Sequência de videos raivosos"
                screenName="inducing"
                emotionInduction="angry"

            />
            <Stap
                imagem="assustado"
                title="Surpresa"
                description="Sequência de videos surpresos"
                screenName="inducing"
                emotionInduction="surprise"

            />
            <Stap
                imagem="calmo"
                title="Neutro"
                description="Sequência de videos neutros"
                screenName="inducing"
                emotionInduction="neutral"
            />
            <Stap
                imagem="photo"
                title="Selecione videos da sua galeria"
                description="Você podera selecionar videos da sua galeria"
                screenName="inducing"
                emotionInduction="videosSelect"
                onPress={pickImage}
            />

        </View>

    )
}