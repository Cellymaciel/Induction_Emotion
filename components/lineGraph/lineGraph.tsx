import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";

export function LineGraph() {
  const lineData = [
    { value: 2, label: "Início", dataPointText: "Neutro" },
    { value: 6, label: "Meio", dataPointText: "Surpresa" },
    { value: 10, label: "Final", dataPointText: "Alegria" },
  ];

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

