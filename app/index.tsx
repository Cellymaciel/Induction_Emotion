import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { style_login } from "@/styles/css_login";
import { font } from "@/constants/font";
import { colors } from "@/constants/Colors";
import { router, useNavigation } from "expo-router";
import { useState } from "react";
import { configs } from "@/utils/configs";
import * as SecureStore from 'expo-secure-store';




export default function Login(){
    const navigation = useNavigation()
    
       const [ email, setEmail] = useState('')
       const [ password, setPassword] = useState('')
    
        const SaveInfosUser = async (name: string, email: string, phone: string) => {
            try{
                await SecureStore.setItemAsync('nome', name);
                await SecureStore.setItemAsync('email', email);
                await SecureStore.setItemAsync('phone', String(phone));
                console.log('Informações salvas com sucesso')
            }
            catch (error){
                console.error('Erro ao salvar as informações do usuario', error)
            }
        }

        const handleSubitLogin = async (email : string, password: string) =>{
            if(!email || !password ){
                alert("Preencha todos os campos")
                return
            }
            fetch(configs.baseURL+ '/users/login',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email,password})
            }). then(async response => {
    
                if(response.status == 200){
                    const data = await response.json();
                    await  SaveInfosUser(String(data.name), String(data.email), String(data.phone)); 
                    console.log('usuario Logado')
                    router.navigate('/(app)/home')
                    return response.json()
                }else if ( response.status == 401){
                    alert('Email ou senha Incorreto')
                }
            })
        }
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
                    <TextInput style={style_login.input} placeholder="E-mail" 
                    onChangeText={text=> setEmail(text)}/>                  
                    <TextInput style={style_login.input} placeholder="Senha" keyboardType="numeric" secureTextEntry
                    onChangeText={text=>setPassword(text)}/>      
                    <View style={{alignItems:'flex-end'}}>
                        <Text style={{fontFamily:font.light}}> Esqueceu sua senha?</Text>
                    </View>
                </View>
                <View>
                </View>   
                <TouchableOpacity style={style_login.btn}   onPress={() => handleSubitLogin(email, password)}>
                    <Text style={{fontFamily: font.bold, color:colors.White, fontSize:18 }}>Entrar</Text>    
                </TouchableOpacity>  
            <View>
                <View style={{justifyContent:'center', flexDirection:'row', marginTop:45, gap:7}}>
                    <Text style={{fontFamily:font.regular, fontSize:15, color:colors.Black}}>Não tem conta?</Text>
                    <TouchableOpacity onPress={()=>  router.navigate('/(auth)/cadastro')}>
                        <Text style={{fontFamily:font.medium, fontSize:16, color:colors.Black}}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <Image source={require("@/assets/images/vetor2.png")}/>
        </View>
    )
}