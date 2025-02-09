import { StyleSheet } from "react-native";
import { font } from "@/constants/font";
import { colors } from "@/constants/Colors";


const styles_header = StyleSheet.create({
    container:{
        marginTop:20,
        flexDirection:'row',
        gap:15
    },
    box_icon:{
        padding:15,
        borderRadius:50,
        backgroundColor:colors.SKY_BLUE
    },
    text:{
        fontFamily:font.medium,
        color: colors.Black,
        fontSize:18
    }
})
export {styles_header}