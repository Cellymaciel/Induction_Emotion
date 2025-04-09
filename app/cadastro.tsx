import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";
import { View, Text , Image, TextInput, TouchableOpacity} from "react-native";
import { style_login } from "@/styles/css_login";
import { router, useNavigation } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
import { configs } from "@/utils/configs";



export default function Cadastro(){
    const [ email, setEmail] = useState('')
    const [ password, setPassword] = useState('')
    const [ name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const navigation = useNavigation()

    const hadleSubmit = (
        name : string,
        email : string,
        password: string,
        phone : string
    )=> {
        if(!email || !password){
            alert("Preencha todos os campos")
            return;
        }
        fetch(configs.baseURL+ '/users/createUser', {
            method: 'POST',
            headers:{
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email,password,phone})
        }).then(response => {
            if(response.status == 200){
                alert('Usuario criado com sucesso')
                navigation.navigate('index')
            }else if( response.status == 409){
                throw new Error("Usario ja cadastrado");
            }
        })
    }
    
    return(
        <View style={{flex:1}}>
            <Image source={require("@/assets/images/vetor1.png")}/>
            <View style={{padding:15}}>
                <View style={{alignItems:'center', marginTop:15}}>
                    <Text style={{fontFamily:font.bold, color:colors.Black, fontSize:25}}>Crie sua conta</Text>
                </View>
                <View style={{marginTop:20, gap:20, padding:25}}>

                    <TextInput style={style_login.input} placeholder="Nome e sobrenome" 
                    onChangeText={text => setName(text)}/>     
                    <TextInput style={style_login.input} placeholder="Senha" keyboardType="numeric"
                    onChangeText={text => setPassword(text)} />  
                    <TextInput style={style_login.input} placeholder="E-mail"  
                    onChangeText={text => setEmail(text)}/>      
                    <TextInput style={style_login.input} placeholder="Telefone" keyboardType="numeric" 
                    onChangeText={text=> setPhone(text)}/>     

             <TouchableOpacity style={[style_login.btn ,{marginTop:15}]}
            onPress={()=>
                hadleSubmit(
                    name,
                    email,
                    password,
                    phone
                )
            }
            >
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