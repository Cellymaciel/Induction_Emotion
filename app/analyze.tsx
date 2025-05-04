import { View, Text , Image, ScrollView} from "react-native";
import { styles_analyzes_happy } from "@/styles/css_analyzes_happy";
import { Header } from "@/components/headers/header";
import React, { useEffect, useState } from "react";
import { PieChart} from "react-native-gifted-charts"
import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";
import { ButtonNew } from "@/components/buttons/buton_index";
import { PieGraph } from "@/components/pieGraph";
import { LineGraph } from "@/components/lineGraph/lineGraph";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSearchParams } from "expo-router/build/hooks";
import { getUserEmail } from "@/utils/infos";
import { configs } from "@/utils/configs";
import { BarGraph } from "@/components/barGraph";

interface InducingResponse {
    user: any; 
    dataInicio: string;
    dataFim: string;
    emocaoEscolha: string;
    emocaoDominate: string ;
    idInducion: number;
    allDetectedEmotions: string[];
    detailsInducing: { video: number; emotionsDominates: string[] }[];
}

interface EmotionKeys {
    happy: string;
    sad: string;
    angry: string;
    surprise: string;
    neutral: string;
    fear: string;
   }
   type Emotion = "HAPPY" | "SAD" | "ANGRY" | "NEUTRAL" | "SURPRISE" | "FEAR" | "DISGUST";

  
   const emotionTranslations: EmotionKeys = {
    'happy': 'Alegria',
    'sad': 'Tristeza',
    'angry': 'Raiva',
    'surprise': 'Surpresa',
    'neutral': 'Calmo',
    'fear': 'Medo'
   };
export default function Analyze(){
  const [inducingData, setInducingData] = useState<InducingResponse | null>(null);
    const searchParams = useSearchParams()
    const  email = String(searchParams.get('email')) || "";

    const emotionImages = {
        HAPPY: require('@/assets/images/emotions/alegria.png'),
        SAD: require('@/assets/images/emotions/tristeza.png'),
        ANGRY: require('@/assets/images/emotions/raiva.png'),
        NEUTRAL: require('@/assets/images/emotions/calmo.png'),
        SURPRISE: require('@/assets/images/emotions/assustado.png'),
        FEAR: require('@/assets/images/emotions/assustado.png'),
        DISGUST: require('@/assets/images/emotions/raiva.png'),

    };
        
    const normalizeEmotion = (emotion: string) => {
        return emotion ? emotion.toUpperCase() : 'NEUTRAL';
    };

  useEffect(() => {
    const fetchInducingData = async () => {

      const storedEmail = await getUserEmail(email);
            getUserEmail(storedEmail)
      console.log(storedEmail)
            try {
              if (storedEmail) {
                  const response = await fetch(configs.baseURL + `/inducing/user/${storedEmail}/last`, {
                      method: 'GET',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                  });
  
                  if (response.ok) {
                      const data = await response.json();
                      setInducingData(data);
                      
                  } else {
                      console.error('Erro ao buscar dados da indução:', response.status);
                  }
              } else {
                  console.warn('Email do usuário não encontrado.');
              }
          } catch (error) {
              console.error('Erro ao buscar dados da indução:', error);
          }
      };
  
      fetchInducingData();
  }, []);
  
  if (!inducingData) {
      return (
          <View style={styles_analyzes_happy.container}>
              <Header />
              <Text>Carregando análise...</Text>
          </View>
      );
  }

  
    
    return(
      <ScrollView>
        <View style={styles_analyzes_happy.container}>
            <Header/>
            <Text style={styles_analyzes_happy.title}> Analise da indução:</Text>
              <View style={{flexDirection:'row', gap:70,  backgroundColor:colors.Pure_White, elevation:15, borderRadius:15,  alignItems:'center',justifyContent:'center',padding:15, marginTop:20}}>
                 <View style={{flexDirection:'row',gap:5}}>
                  <Text style={styles_analyzes_happy.text_card}>Data:</Text>
                  <Text style={[styles_analyzes_happy.text_about,{marginTop:5}]}>{new Date(inducingData.dataInicio).toLocaleDateString('pt-BR')}</Text>
              </View>
              <View style={{flexDirection:'row', gap:5}}>
                  <Text style={styles_analyzes_happy.text_card}>Hora:</Text>
                  <Text  style={[styles_analyzes_happy.text_about,{marginTop:5}]}>{new Date(inducingData.dataInicio).toLocaleTimeString('pt-BR')}</Text>
              </View>
              </View>
            <View style={styles_analyzes_happy.container_cards}>
                <View style={styles_analyzes_happy.card}>
                    <Text style={styles_analyzes_happy.text_card}>Emoção Esperada:</Text>
                    <Image  source={emotionImages[normalizeEmotion(inducingData.emocaoEscolha) as Emotion]}  style={styles_analyzes_happy.img_card} />
                    <Text style={styles_analyzes_happy.text_about}>  {emotionTranslations[inducingData.emocaoEscolha as keyof EmotionKeys] || inducingData.emocaoEscolha}</Text>
                </View>
                <View style={styles_analyzes_happy.card}>
                    <Text style={styles_analyzes_happy.text_card}>Emoção Dominate:</Text>
                    <Image  source={emotionImages[normalizeEmotion(inducingData.emocaoDominate) as Emotion]}style={styles_analyzes_happy.img_card}  />
                    <Text style={styles_analyzes_happy.text_about}>  {emotionTranslations[inducingData.emocaoDominate as keyof EmotionKeys] || inducingData.emocaoDominate}</Text>
                </View>
            </View>
            <PieGraph title={"Porcentagem de humores registrado durante a indução" } allDetectedEmotions={inducingData.allDetectedEmotions}/>
            <LineGraph allDetectedEmotions={inducingData.allDetectedEmotions}/>
         <View style={styles_analyzes_happy.contaner_videos}>
            <Text style={styles_analyzes_happy.txt_cnt_videos}> Videos que obtiveram maior indução :</Text>
            <Text style={{fontFamily:font.light, textAlign:'center'}}> videos aki .....</Text>
        </View>
      <ButtonNew/>
  </View>
  </ScrollView>
    )
}


 