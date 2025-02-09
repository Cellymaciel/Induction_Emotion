import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";
import { StyleSheet } from "react-native";

const style_stap = StyleSheet.create({
    container:{
        padding:20,
        backgroundColor:colors.Pure_White,
        flexDirection:'row',
        gap: 15,
        elevation:15,
        borderRadius:15
    },
    view:{
        width:38,
        height:38,
        borderRadius:5
    },
    box_text:{
        flexDirection:'column'
    },
    title:{
        fontFamily:font.medium,
        fontSize:16,
        color:colors.DARK_GREY
    },
    description:{
        fontFamily:font.regular,
        fontSize:12,
        color:'#8A959E'
    }
})
export {style_stap}