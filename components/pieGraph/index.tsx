import { colors } from "@/constants/Colors";
import { PieChart} from "react-native-gifted-charts"
import { font } from "@/constants/font";
import { View ,Text, StyleSheet} from "react-native";

type Props = {
    title: String;
   }
export function PieGraph({ title}: Props){
   
    const pieData = [
           { value: 25, color: colors.YELLOW, text: "25%" }, // Amarelo - Alegre
           { value: 50, color: colors.DARK_BLUE, text: "50%" }, // Azul - Triste
           { value: 10, color: colors.red, text: "10%" }, // Vermelho - Irritado
           { value: 15, color: colors.GREEN, text:"15%" },
           { value: 0, color: colors.DARK_PINK, text:"0%" }, // Outras emoções (exemplo)
           // Outras emoções (exemplo)
         ];
  
    return(
        <View style={styles_analyzes_happy.graphContainer}>
        <Text style={styles_analyzes_happy.graphTitle}>{title} </Text>
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

    )
}
const styles_analyzes_happy = StyleSheet.create({
 
    graphContainer: {
        alignItems: "center",
        marginTop: 20,
        padding:15,
        elevation:15,
        backgroundColor:colors.Pure_White,
        borderRadius:10
      },
      graphTitle: {
        fontSize: 16,
        fontFamily:font.medium,
        marginBottom: 12,
        color:colors.Black
      },
      legend: {
        marginTop: 16,
        alignItems: "flex-start",
        gap:10
    },
    legendItem: {
        flexDirection: "row",
        textAlign:'center',
        alignItems: "center",
        marginBottom: 4,
        gap:8
      },
      legendColor: {
        width: 12,
        height: 12,
        borderRadius: 6,
        alignItems:'flex-start'
      },
      txt_legende:{
        fontFamily:font.light,
        color:colors.Black
      },
      

});