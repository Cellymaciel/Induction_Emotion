import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";
import { StyleSheet } from "react-native";

const style_staps = StyleSheet.create ({
    container:{
        gap:16,
        marginTop:25
    },
    box_txt_icon:{
        flexDirection:'row',
        gap:45
    },
    txt:{
        fontFamily:font.light,
        fontSize:16,
        color:colors.Black
    },
    box_Icon:{
        alignItems:'flex-end'
    }
})

export {style_staps}