import { colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const style_perfil = StyleSheet.create({
    container:{
        flex:1,
        
    },
    box_first:{
        padding:15,
        backgroundColor:colors.Black,
        borderBottomRightRadius:70,
        paddingBottom:20,
    },
    box_second:{
        padding:20,
        backgroundColor:colors.White,
        borderTopLeftRadius:70,
        gap:15
    
    }
});

export {style_perfil}