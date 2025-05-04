import { colors } from "@/constants/Colors";
import { PieChart} from "react-native-gifted-charts"
import { font } from "@/constants/font";
import { View ,Text, StyleSheet} from "react-native";

type Props = {
    title: String;
    allDetectedEmotions:string [][];

   }

   const calculateEmotionPercentages = (allDetectedEmotions: string[][]) => {
    const flattenedEmotions = allDetectedEmotions.flat();

    const emotionCount = flattenedEmotions.reduce((acc, emotion) => {
        const key = emotion.toLowerCase();
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const total = flattenedEmotions.length;
    return Object.entries(emotionCount).map(([emotion, count]) => ({
        emotion,
        percentage: Math.round((count / total) * 100)
    }));
};
  const emotionColors = {
    happy: colors.amarelo,
    sad: colors.DARK_BLUE,
    angry: colors.vermelho,
    neutral: colors.GREEN,
    fear: colors.roxo,
    surprise: colors.roxo,
    disgust: colors.vermelho
};

const emotionTranslations: Record<string, string> = {
  happy: "Alegria",
  sad: "Tristeza",
  angry: "Raiva",
  neutral: "Neutro",
  fear: "Medo",
  surprise: "Surpresa",
  disgust: "Nojo",
};


export function PieGraph({ title, allDetectedEmotions}: Props ){
   
  const emotionData = calculateEmotionPercentages(allDetectedEmotions);

        const pieData = emotionData.map(({ emotion, percentage }) => {
                const translatedLabel = emotionTranslations[emotion] || emotion;
                return {
                        value: percentage,
                        color: emotionColors[emotion as keyof typeof emotionColors] || colors.cinzas[500],
                        text: `${percentage}%`,
                        label: translatedLabel
                };
        });

  
    return(
        <View style={styles_analyzes_happy.graphContainer}>
        <Text style={styles_analyzes_happy.graphTitle}>{title} </Text>
     <View style={{flexDirection:'row', gap:20}}>
    <PieChart
      data={pieData}
      donut
      radius={80}
      innerRadius={50}
      textSize={12}
      centerLabelComponent={() => (
        <Text style={{ fontSize: 14, fontFamily: font.bold , color:colors.Black}}>Humores</Text>
      )}
    />
    
    <View style={styles_analyzes_happy.legend}>
                    {pieData.map((item, index) => (
                        <View key={index} style={styles_analyzes_happy.legendItem}>
                            <View style={[styles_analyzes_happy.legendColor, { backgroundColor: item.color }]} />
                            <Text style={styles_analyzes_happy.txt_legende}>
                                {item.label} - {item.value}%
                            </Text>
                        </View>
                    ))}
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