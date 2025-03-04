import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";
import React from "react";
import { View, Text , StyleSheet} from "react-native";
import { BarChart } from 'react-native-gifted-charts';

export function BarGraph() {
  const barData = [
    { value: 10, label: 'Instagram', frontColor: '#E6E951'},
    { value: 4, label: 'X', frontColor: '#0092D4' },
    { value: 6, label: 'Reddit', frontColor: '#AA0D95'},
    { value: 8, label: 'TikTok',frontColor: '#FF3737'},
    { value: 2, label: 'Facebook', frontColor: '#64D476'},
  ];

 

  return (
    <View style={s.container}>
      <Text style={s.text}>Picos de Emoções nas Redes Sociais</Text>
      <BarChart
        data={barData}
        noOfSections={5} 
        yAxisTextStyle={{fontFamily:font.light,
          color:colors.Black,fontSize: 12 }}
        barBorderRadius={4}
        yAxisLabelWidth={20} 
        hideRules={true}
        frontColor={colors.Black}
        xAxisLabelTextStyle={{fontFamily:font.regular, color:colors.text.cinza,fontSize: 12}}
      />
     <View style={{gap:10}}>
      <Text style={s.text}>Legenda :</Text>
      <View style={{flexDirection:"column", gap:5, alignItems:'center', justifyContent:'center'}}>
      <View style={{flexDirection:'row', gap :22, alignItems:'center'}}>
        <View style={s.legendItem}>
          <Text style={[s.legendText ,{color:colors.GREEN} ]}>2 - </Text>
          <Text style={s.subText}>Neutro</Text>
        </View>
        <View style={s.legendItem}>
          <Text style={[s.legendText ,{color:colors.DARK_BLUE}]}>4 - </Text>
          <Text style={s.subText}>Tristeza</Text>
        </View>
        <View style={s.legendItem}>
          <Text style={[s.legendText ,{color:'#AA0D95'}]}>6 - </Text>
          <Text style={s.subText}>Surpresa</Text>
        </View>
      </View>
      <View style={{flexDirection:'row', gap :22, alignItems:'center'}}>
        <View style={s.legendItem}>
          <Text style={[s.legendText ,{color:"#FF3737"}]}>8 - </Text>
          <Text style={s.subText}>Raiva</Text>
        </View>
        <View style={s.legendItem}>
          <Text style={[s.legendText, {color:colors.YELLOW}]}>10 - </Text>
          <Text style={s.subText }>Alegria</Text>
        </View> 
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