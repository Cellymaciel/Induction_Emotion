import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";
import { ResizeMode } from "expo-av";
import { StyleSheet } from "react-native";

const styles_analyzes_happy = StyleSheet.create({
    container:{
        padding:15
    },
    title:{
        fontFamily:font.bold,
        color:colors.Black,
        fontSize:26,
        marginTop:20
    },
    container_cards:{
        flexDirection:'row',
        gap:15,
        marginTop:15
    },
    card:{
        backgroundColor:colors.Pure_White,
        elevation:15,
        borderRadius:15,
        alignItems:'center',
        padding:15,
        flex:1
    },
    text_card:{
        fontFamily:font.medium,
        fontSize:16,
        color:colors.Black
    },
    img_card:{
        borderRadius:5,
        resizeMode: ResizeMode.COVER,
        width:50,
        height:50,
        marginTop:15
    },
    text_about:{
        fontFamily:font.light,
        fontSize:12,
        color:colors.Black
    },
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
      contaner_videos:{
        backgroundColor:colors.Pure_White,
        borderRadius:10,
        padding:15,
        elevation:15,
        marginTop:15
      },
      txt_cnt_videos:{
        fontFamily:font.medium,
        marginBottom: 12,
        color:colors.Black
      }

});

export {styles_analyzes_happy}