import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";
import React from "react";
import { View, Text , StyleSheet} from "react-native";
import { BarChart } from 'react-native-gifted-charts';

interface BarGraphProps {
  emotionCounts: { emotion: string; count: number }[];
}
const emotionTranslations: Record<string, string> = {
  happy: "Alegria",
  sad: "Tristeza",
  angry: "Raiva",
  neutral: "Neutro",
  fear: "Medo",
  surprise: "Surpresa",
  disgust: "Nojo",
};

export function BarGraph({ emotionCounts }: BarGraphProps) {
  const barData = emotionCounts.map(item => ({
    value: item.count,
    label: item.emotion,
    frontColor: getEmotionColor(item.emotion), 
  }));

  function getEmotionColor(emotion: string) {
    switch (emotion.toLowerCase()) {
      case 'happy':
        return colors.amarelo;
      case 'sad':
        return colors.DARK_BLUE;
      case 'neutral':
        return colors.GREEN;
      case 'angry':
        return '#FF3737';
      case 'surprise':
        return '#AA0D95';
      default:
        return colors.cinzas[500]; 
    }
  }

  return (
    <View style={s.container}>
      <Text style={s.text}>Distribuição das Emoções Durante o uso</Text>
      <BarChart
        data={barData}
        noOfSections={5}
        yAxisTextStyle={{
          fontFamily: font.light,
          color: colors.Black,
          fontSize: 12
        }}
        barBorderRadius={4}
        yAxisLabelWidth={36}
        hideRules={true}
        maxValue={100}
        xAxisLabelTextStyle={{
          fontFamily: font.regular,
          color: colors.text.cinza,
          fontSize: 12
        }}
      />
      <View style={{ gap: 10 }}>
        <Text style={s.text}>Legenda:</Text>
        <View style={s.legendContainer}>
          {emotionCounts.map(item => (
            <View key={item.emotion} style={s.legendItem}>
              <Text style={[s.legendText, { color: getEmotionColor(item.emotion) }]}>{item.count}% - </Text>
              <Text style={s.subText}>{emotionTranslations[item.emotion.toLowerCase() as keyof typeof emotionTranslations] || item.emotion}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  
  container:{
    borderRadius:16,
    paddingTop:32,
    padding:24,
    backgroundColor:colors.Pure_White,
    marginTop:25,
    gap:25,
    elevation:15,
  },
  text:{
    fontFamily:font.medium,
    fontSize:16,
    color:colors.Black
  },
  constt:{
    paddingRight:10
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginTop: 20,
    alignItems:'center',
    justifyContent:'center'
  },
  legendItem: {
    flexDirection: "row",
  },
  icon: {
    fontSize: 24,
    marginRight: 8,
  },
  legendText: {
    fontFamily: font.bold,
    fontSize: 15,
    textAlign:'left'
  },
  subText: {
    fontFamily: font.regular,
    fontSize: 14,
    color: colors.text.cinza,
    textAlign:'left'

  },

})