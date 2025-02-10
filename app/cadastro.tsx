import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";
import { View, Text , Image, TextInput, TouchableOpacity} from "react-native";
import { style_login } from "@/styles/css_login";
import { useNavigation } from "expo-router";
export default function Cadastro(){
    const navigation = useNavigation()
    return(
        <View style={{flex:1}}>
            <Image source={require("@/assets/images/vetor1.png")}/>
            <View style={{padding:15}}>
                <View style={{alignItems:'center', marginTop:15}}>
                    <Text style={{fontFamily:font.bold, color:colors.Black, fontSize:25}}>Crie sua conta</Text>
                </View>
                <View style={{marginTop:20, gap:20, padding:25}}>
                    <TextInput style={style_login.input} placeholder="Nome e sobrenome"/>                  
                    <TextInput style={style_login.input} placeholder="Senha" keyboardType="numeric" />  
                    <TextInput style={style_login.input} placeholder="E-mail"  />      
                    <TextInput style={style_login.input} placeholder="Telefone" keyboardType="numeric" />          
             <TouchableOpacity style={[style_login.btn ,{marginTop:15}]} onPress={()=> navigation.navigate('index')}>
                <Text style={{fontFamily: font.bold, color:colors.White, fontSize:18 }}>Cadastrar</Text>    
             </TouchableOpacity>  
             <View style={{alignItems:'center', flexDirection:'row', gap:3, marginTop:10, justifyContent:'center'}}>
                <Text style={{fontFamily: font.regular, fontSize:14}} >Leia</Text>
                <Text style={{fontFamily: font.medium, fontSize:15}}>Termos de Politica e Privacidade</Text>
             </View>
            </View>
        </View>
        
        <Image source={require("@/assets/images/vetor2.png")}/>

  </View>

    )
}