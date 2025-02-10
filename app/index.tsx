import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { style_login } from "@/styles/css_login";
import { font } from "@/constants/font";
import { colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";

export default function Login(){
    const navigation = useNavigation()
    return(
        <View style={style_login.container}>
            <Image source={require("@/assets/images/vetor1.png")}/>
            <View style={style_login.subCOntainer}>
                <View style={style_login.box_Title}>
                    <Text style={style_login.title}>Bem-Vindo!</Text>
                    <Text style={style_login.subTitle}>Inducing Emotion</Text>
                </View>
                <View style={{marginTop:35, alignItems:"center"}}>
                    <Text style={{fontFamily:font.regular,fontSize:18, color:colors.Black}}> Entre ou Crie sua conta</Text>
                </View>
                <View style={{marginTop:20, gap:20, padding:25}}>
                    <TextInput style={style_login.input} placeholder="E-mail"/>                  
                    <TextInput style={style_login.input} placeholder="Senha" keyboardType="numeric" />      
                    <View style={{alignItems:'flex-end'}}>
                        <Text style={{fontFamily:font.light}}> Esqueceu sua senha?</Text>
                    </View>
                </View>
                <View>
                </View>   
                <TouchableOpacity style={style_login.btn} onPress={()=> navigation.navigate('home')}>
                    <Text style={{fontFamily: font.bold, color:colors.White, fontSize:18 }}>Entrar</Text>    
                </TouchableOpacity>  
            <View>
                <View style={{justifyContent:'center', flexDirection:'row', marginTop:45, gap:7}}>
                    <Text style={{fontFamily:font.regular, fontSize:15, color:colors.Black}}>Não tem conta?</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('cadastro')}>
                        <Text style={{fontFamily:font.medium, fontSize:16, color:colors.Black}}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <Image source={require("@/assets/images/vetor2.png")}/>
        </View>
    )
}