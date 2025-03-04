import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";

export function EmotionComparisonGraph() {
  const barData = [
    { value: 70, label: "Esperada", frontColor: "#FFB74D" }, // Exemplo: Alegria esperada foi dominante 70% das vezes
    { value: 30, label: "Detectada", frontColor: "#64B5F6" }, // Exemplo: Emoções diferentes detectadas 30% das vezes
  ];

  return (
    <View style={s.container}>
      <Text style={s.title}>Comparação: Emoção Esperada vs. Emoção Detectada</Text>
      <BarChart
        data={barData}
        noOfSections={5}
        barBorderRadius={8}
        yAxisLabelWidth={30}
        hideRules={true}
        xAxisLength={185}
        yAxisTextStyle={{
          fontFamily: font.light,
          color: colors.Black,
          fontSize: 12,
        }}
        xAxisLabelTextStyle={{
          fontFamily: font.regular,
          color: colors.text.cinza,
          fontSize: 12,
        }}
      />
      <View style={s.legendContainer}>
        <View style={s.legendItem}>
          <View style={[s.legendColor, { backgroundColor: "#FFB74D" }]} />
          <Text style={s.legendText}>Emoção Esperada</Text>
        </View>
        <View style={s.legendItem}>
          <View style={[s.legendColor, { backgroundColor: "#64B5F6" }]} />
          <Text style={s.legendText}>Outras Emoções Detectadas</Text>
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
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
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
    fontSize: 12,
    color: colors.text.cinza,
  },
});

