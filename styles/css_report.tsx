import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";
import { StyleSheet } from "react-native";

const styles_report = StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        backgroundColor:colors.Black,
        paddingTop:45,
        padding:18,
        paddingBottom:26,
        justifyContent:'space-between',
        flexDirection:'row',
    },
    titleHeader:{
        fontFamily:font.medium,
        color:colors.White,
        fontSize:22,
        marginTop:5
    },
    textIcon:{
        fontFamily:font.regular,
        fontSize:14,
        color:colors.White
    },
    containerAll:{
        padding:18
    },
    contText:{
        marginTop:20,
        alignItems:'flex-start'
    },
    textTitle:{
        fontFamily:font.light,
        fontSize:16,
        color:colors.Black,
        textAlign:'left'
    }
});
export {styles_report}