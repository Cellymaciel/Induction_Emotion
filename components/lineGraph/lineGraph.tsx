import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";


interface Props {
  allDetectedEmotions: string[];
}

export function LineGraph({allDetectedEmotions}:Props) {
  const emotionValence: Record<string, number> = {
    happy: 1,
    surprise: 0.5,
    neutral: 0,
    sad: -0.5,
    angry: -0.7,
    fear: -0.8,
    disgust: -0.9,
  };

  const lineData = allDetectedEmotions.map((emotion, index) => ({
    value: emotionValence[emotion.toLowerCase()] || 0,
    label: index === 0 ? 'Início' : index === allDetectedEmotions.length - 1 ? 'Final' : '', 
    dataPointText: emotion, 
  }));


  return (
    <View style={s.container}>
      <Text style={s.title}>Variação Emocional ao Longo do Tempo</Text>
      <LineChart
        data={lineData}
        color={colors.DARK_BLUE} 
        thickness={3}
        hideRules
        dataPointsColor={colors.red}
        xAxisLabelTextStyle={{
          fontFamily: font.regular,
          color: colors.text.cinza,
          fontSize: 12,
        }}
        yAxisLabelWidth={30}
        yAxisTextStyle={{
          fontFamily: font.light,
          color: colors.Black,
          fontSize: 12,
        }}
        curved
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 24,
    backgroundColor: colors.Pure_White,
    marginTop: 25,
    gap: 15,
    elevation: 10,
  },
  title: {
    fontFamily: font.medium,
    fontSize: 16,
    color: colors.Black,
    textAlign: "center",
    marginBottom: 10,
  },
});

