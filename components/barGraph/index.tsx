import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";
import React from "react";
import { View, Text , StyleSheet} from "react-native";
import { BarChart } from 'react-native-gifted-charts';

export function BarGraph() {
  const barData = [
    { value: 12, label: 'Alegria', frontColor: colors.YELLOW },
    { value: 8, label: 'Tristeza', frontColor: colors.DARK_BLUE },
    { value: 6, label: 'Neutro', frontColor: colors.GREEN },
    { value: 5, label: 'Raiva', frontColor: '#FF3737' },
    { value: 4, label: 'Surpresa', frontColor: '#AA0D95' },
  ];

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
        yAxisLabelWidth={20} 
        hideRules={true}
        xAxisLabelTextStyle={{
          fontFamily: font.regular, 
          color: colors.text.cinza, 
          fontSize: 12
        }}
      />
      <View style={{ gap: 10 }}>
        <Text style={s.text}>Legenda:</Text>
        <View style={s.legendContainer}>
          <View style={s.legendItem}>
            <Text style={[s.legendText, { color: colors.YELLOW }]}>12 - </Text>
            <Text style={s.subText}>Alegria</Text>
          </View>
          <View style={s.legendItem}>
            <Text style={[s.legendText, { color: colors.DARK_BLUE }]}>8 - </Text>
            <Text style={s.subText}>Tristeza</Text>
          </View>
          <View style={s.legendItem}>
            <Text style={[s.legendText, { color: colors.GREEN }]}>6 - </Text>
            <Text style={s.subText}>Neutro</Text>
          </View>
          <View style={s.legendItem}>
            <Text style={[s.legendText, { color: "#FF3737" }]}>5 - </Text>
            <Text style={s.subText}>Raiva</Text>
          </View>
          <View style={s.legendItem}>
            <Text style={[s.legendText, { color: "#AA0D95" }]}>4 - </Text>
            <Text style={s.subText}>Surpresa</Text>
          </View>
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