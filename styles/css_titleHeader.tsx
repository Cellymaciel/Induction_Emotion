import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";
import { StyleSheet } from "react-native";

const stles_titleHeader = StyleSheet.create({
    container:{
        flexDirection:'row',
        gap:5,
        marginTop:25,
    
    },
    title1:{
        fontSize:26,
        fontFamily:font.bold,
        color:colors.Black
    },
    title2:{
        fontFamily:font.light,
        fontSize:26,
        color:colors.Black
    }
})
export{ stles_titleHeader}