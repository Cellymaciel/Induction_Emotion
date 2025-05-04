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
        padding:18,
      
    },
    contText:{
        marginTop:20,
        alignItems:'flex-start'
    },
    textTitle:{
        fontFamily:font.light,
        fontSize:15,
        color:colors.Black,
        textAlign:'left'
    },
    contInputs:{
        flexDirection:'row',
         justifyContent:'space-between', 
         gap:14,
         marginTop:15,
    },
    btn:{
        height: 49,
        width: 170,
        borderRadius: 10,
        backgroundColor:colors.Black,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:12,
        paddingBottom:12,
        marginTop:20
    },

});
export {styles_report}