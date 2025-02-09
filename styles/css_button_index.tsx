import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";
import { StyleSheet } from "react-native";

const style_btn_index = StyleSheet.create({
    container:{
        alignItems:"center",
        marginTop:25
    },
    btn:{
        flexDirection:'row',
        borderRadius:10,
        padding:15,
        backgroundColor:colors.Black,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        gap:8,
        elevation:15

    },
    text:{
        fontFamily:font.bold,
        color:colors.Pure_White,
        fontSize:16
    }
})
export {style_btn_index}