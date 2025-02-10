import { View, Text , Image} from "react-native";
import { styles_analyzes_happy } from "@/styles/css_analyzes_happy";
import { Header } from "@/components/header";
import React from "react";
import { PieChart} from "react-native-gifted-charts"
import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";
import { ButtonNew } from "@/components/buttons/buton_index";
export default function Analyze_Happy(){
   
    const pieData = [
        { value: 25, color: colors.YELLOW, text: "25%" }, // Amarelo - Alegre
        { value: 50, color: colors.DARK_BLUE, text: "50%" }, // Azul - Triste
        { value: 10, color: colors.red, text: "10%" }, // Vermelho - Irritado
        { value: 15, color: colors.GREEN, text:"15%" },
        { value: 0, color: colors.DARK_PINK, text:"0%" }, // Outras emoções (exemplo)
        // Outras emoções (exemplo)
      ];
      
    
    return(
        <View style={styles_analyzes_happy.container}>
            <Header/>
            <Text style={styles_analyzes_happy.title}> Analise da indução:</Text>
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
      
        <View style={styles_analyzes_happy.graphContainer}>
            <Text style={styles_analyzes_happy.graphTitle}>
          Variação de humores durante a indução:   </Text>
         <View style={{flexDirection:'row', gap:20}}>
        <PieChart
          data={pieData}
          donut
          showText
          textColor={colors.Black}
          radius={80}
          innerRadius={50}
          textSize={12}
          centerLabelComponent={() => (
            <Text style={{ fontSize: 14, fontFamily: font.bold , color:colors.Black}}>Humores</Text>
          )}
        />
        
        <View style={styles_analyzes_happy.legend}>
          <View style={styles_analyzes_happy.legendItem}>
            <View style={[styles_analyzes_happy.legendColor, { backgroundColor: colors.YELLOW }]} />
            <Text style={styles_analyzes_happy.txt_legende}>Alegre - 25%</Text>
          </View>
          <View style={styles_analyzes_happy.legendItem}>
            <View style={[styles_analyzes_happy.legendColor, { backgroundColor: colors.DARK_BLUE }]} />
            <Text style={styles_analyzes_happy.txt_legende}>Triste - 50%</Text>
          </View>
          <View style={styles_analyzes_happy.legendItem}>
            <View style={[styles_analyzes_happy.legendColor, { backgroundColor:colors.red }]} />
            <Text style={styles_analyzes_happy.txt_legende}>Raivoso - 10%</Text>
          </View>
          <View style={styles_analyzes_happy.legendItem}>
            <View style={[styles_analyzes_happy.legendColor, { backgroundColor:colors.GREEN}]} />
            <Text style={styles_analyzes_happy.txt_legende}>Neutro - 15%</Text>
          </View>
          <View style={styles_analyzes_happy.legendItem}>
            <View style={[styles_analyzes_happy.legendColor, { backgroundColor:colors.DARK_PINK}]} />
            <Text style={styles_analyzes_happy.txt_legende}>Surpresa - 0%</Text>
          </View>
        </View>
      </View>
      </View>
      <View style={styles_analyzes_happy.contaner_videos}>
        <Text style={styles_analyzes_happy.txt_cnt_videos}> Videos que obtiveram maior indução :</Text>
        <Text style={{fontFamily:font.light, textAlign:'center'}}> videos aki .....</Text>
      </View>
      <ButtonNew/>
  </View>
        
    )
}
 