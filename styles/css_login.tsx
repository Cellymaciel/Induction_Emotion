import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";
import { StyleSheet } from "react-native";

const style_login = StyleSheet.create({
    container:{
        flex:1
    },
    subCOntainer:{
        padding:15
    },
    box_Title:{
        flexDirection:"row",
        marginTop:25,
        gap:5,
        textAlign:'center'
    },
    title:{
        fontFamily:font.bold,
        fontSize:35,
        color:colors.Black   
    },
    subTitle:{
        fontFamily:font.medium,
        fontSize:18,
        color:colors.Black,
        marginTop:17

    },
    input:{
        borderRadius:15,
        backgroundColor:colors.Pure_White,
        elevation:15,
        color:colors.DARK_GREY,
        padding:15
    },
    
    btn:{
        padding:15,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.Black,
        borderRadius:15,
        marginTop:10
    }
})
export {style_login}