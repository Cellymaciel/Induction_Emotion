import { View, Text , Image, ScrollView} from "react-native";
import { styles_analyzes_happy } from "@/styles/css_analyzes_happy";
import { Header } from "@/components/headers/header";
import React from "react";
import { PieChart} from "react-native-gifted-charts"
import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";
import { ButtonNew } from "@/components/buttons/buton_index";
import { PieGraph } from "@/components/pieGraph";
import { LineGraph } from "@/components/lineGraph/lineGraph";
export default function Analyze(){
   
      
    
    return(
      <ScrollView>
        <View style={styles_analyzes_happy.container}>
            <Header/>
            <Text style={styles_analyzes_happy.title}> Analise da indução:</Text>
              <View style={{flexDirection:'row', gap:70,  backgroundColor:colors.Pure_White, elevation:15, borderRadius:15,  alignItems:'center',justifyContent:'center',padding:15, marginTop:20}}>
                <View style={{flexDirection:'row',gap:5}}>
                  <Text style={styles_analyzes_happy.text_card}>Data:</Text>
                  <Text style={[styles_analyzes_happy.text_about,{marginTop:5}]}>15/02/2025</Text>
                </View>
                <View style={{flexDirection:'row', gap:5}}>
                  <Text style={styles_analyzes_happy.text_card}>Hora:</Text>
                  <Text  style={[styles_analyzes_happy.text_about,{marginTop:5}]}>13:15</Text>
                </View>
              </View>
            <View style={styles_analyzes_happy.container_cards}>
                <View style={styles_analyzes_happy.card}>
                    <Text style={styles_analyzes_happy.text_card}>Emoção Esperada:</Text>
                    <Image source={ require('@/assets/images/alegria.png')} style={styles_analyzes_happy.img_card} />
                    <Text style={styles_analyzes_happy.text_about}>Alegria</Text>
                </View>
                <View style={styles_analyzes_happy.card}>
                    <Text style={styles_analyzes_happy.text_card}>Emoção Dominate:</Text>
                    <Image source={ require('@/assets/images/triste.png')} style={styles_analyzes_happy.img_card}  />
                    <Text style={styles_analyzes_happy.text_about}>Tristeza</Text>
                </View>
            </View>
            <PieGraph title={"Porcentagem de humores registrado durante a indução"}/>
            <LineGraph/>
      <View style={styles_analyzes_happy.contaner_videos}>
        <Text style={styles_analyzes_happy.txt_cnt_videos}> Videos que obtiveram maior indução :</Text>
        <Text style={{fontFamily:font.light, textAlign:'center'}}> videos aki .....</Text>
      </View>
      <ButtonNew/>
  </View>
  </ScrollView>
    )
}
 