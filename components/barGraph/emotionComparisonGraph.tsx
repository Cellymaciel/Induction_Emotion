import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";

interface EmotionComparisonGraphProps {
  correctPredictionsCount: number;
  totalInductions: number;
}

export function EmotionComparisonGraph({ correctPredictionsCount, totalInductions }: EmotionComparisonGraphProps) {
  const correctPercentage = totalInductions > 0 ? (correctPredictionsCount / totalInductions) * 100 : 0;
  const incorrectPercentage = 100 - correctPercentage;

  const barData = [
    { value: correctPercentage, label: `Corretas`, frontColor: colors.GREEN },
    { value: incorrectPercentage, label: `Incorretas`, frontColor: colors.vermelho },
  ];

  return (
    <View style={s.container}>
      <Text style={s.title}>Precisão da Indução Emocional</Text>
      <BarChart
        data={barData}
        noOfSections={5}
        maxValue={100}
        barBorderRadius={8}
        yAxisLabelWidth={36}
        hideRules={true}
        spacing={50}
        xAxisLength={200}
        yAxisTextStyle={{
          fontFamily: font.light,
          color: colors.Black,
          fontSize: 12,
          formatLabel: (value: any) => `${value}%`, 
        }}
        xAxisLabelTextStyle={{
          fontFamily: font.regular,
          color: colors.text.cinza,
          fontSize: 12,
        }}
      />
      <View style={s.legendContainer}>
        <View style={s.legendItem}>
          <View style={[s.legendColor, { backgroundColor: colors.GREEN }]} />
          <Text style={s.legendText}>Induções Corretas ({correctPercentage.toFixed(0)}%)</Text>
        </View>
        <View style={s.legendItem}>
          <View style={[s.legendColor, { backgroundColor: colors.vermelho }]} />
          <Text style={s.legendText}>Induções Incorretas ({incorrectPercentage.toFixed(0)}%)</Text>
        </View>
      </View>
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
  legendContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 10,
    paddingLeft:15,
    gap: 15,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontFamily: font.regular,
    fontSize: 14,
    color: colors.Black,
  },
});

