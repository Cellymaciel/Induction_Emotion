import { View, Text, Touchable, TouchableOpacity, TextInput, Alert } from "react-native"
import { style_perfil } from "@/styles/css_perfil"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "@/constants/Colors"
import { font } from "@/constants/font"
import { LinearGradient } from 'expo-linear-gradient';
import CustomModal from "@/components/modal"
import { useEffect, useState } from "react"
import { useRoute } from "@react-navigation/native"
import { configs } from "@/utils/configs"
import { useLocalSearchParams } from "expo-router/build/hooks"
import { getUserEmail } from "@/utils/infos"

export default function Perfil(){
    const [modalEmail, setModalEmail] = useState(false)
    const [modalPasswordCurrent, setModalPasswordCurrent] = useState(false)
    const [modalPhone, setModalPhone] = useState(false)
    const [userNome, setUserNome] = useState<string | null>(null);
    const [userPhone, setUserPhone] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);

   

    const searchParams = useLocalSearchParams()
    const email = String(searchParams.email || "")

    useEffect(() => {
        const fetchUserProfile = async () => {
              const storedEmail = await getUserEmail(email);
                        getUserEmail(storedEmail)
                  console.log(storedEmail)

            try {
                const response = await fetch(configs.baseURL +`/users/profile/${storedEmail}`,{
                    method:'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (response.status === 200) {
                    const data = await response.json();
                    setUserNome(data.name);
                    setUserEmail(data.email);
                    setUserPhone(data.phone);
                    console.log("Dados obtidos com sucesso!")
                }else{
                    Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados do usuário.');

                }
               
            } catch (error) {
                console.error("Erro ao buscar dados do perifl perfil:", error);
            }
        };

         fetchUserProfile()
    }, []);


    return(
        <View style={style_perfil.container}>
        <LinearGradient
                colors={[colors.Black, colors.White]} 
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 0 }} 
                  >
                 <View style={style_perfil.box_first}>
                <View style={{flexDirection:'row', gap:270 , marginTop:15, marginLeft:15}}>
                    <Ionicons name="settings" color={colors.White} size={30}/>
                    <Ionicons name="notifications" color={colors.White} size={30}/>
                </View>
                <View style={{alignItems:'center', justifyContent:'center', marginTop:35}}>
                    <Text style={{fontFamily:font.bold, color:colors.Pure_White, fontSize:36}}>{userNome}</Text>
                </View>
                <View style={{marginTop:10, alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontFamily:font.regular, fontSize:14, color:colors.Pure_White}}>
                        {userEmail}
                    </Text>
                </View>
                <View style={{width:'90%',height:0.5,backgroundColor:'#9FBFF4',marginTop:25,marginLeft:20 }}/>
                <View style={{justifyContent:'center', alignItems:'center', marginTop:22, padding:15}}>
                    <Text style={{fontFamily:font.light, fontSize:12, textAlign:'center' ,color:colors.Pure_White}}>Usuário concedeu permissão para o uso de sua imagem em pesquisa acadêmica, garantindo sua utilização sem fins lucrativos.</Text>
                </View>
            </View>

            <View style={style_perfil.box_second}>
                <TouchableOpacity style={{padding:15, gap:15, backgroundColor:colors.Pure_White, elevation:15, borderRadius:15,marginLeft:15,marginRight:15}}>
                    <View style={{flexDirection:'row', gap:15}}>
                      <View style={{ padding:15, borderRadius:10, backgroundColor:colors.Black}}>
                            <Ionicons name="person-outline" size={25} color={colors.Pure_White}/>
                      </View>
                        <View style={{flexDirection:'column',marginTop:5}}>
                            <Text style={{fontFamily:font.medium,fontSize:16,color:colors.DARK_GREY}}>Nome e sobrenome</Text>
                            <Text style={{ fontFamily:font.regular,fontSize:12,color:'#8A959E'}}>{userNome}</Text>
                        </View>    
                    </View>
                </TouchableOpacity>
              
                <TouchableOpacity style={{padding:15, gap:15, backgroundColor:colors.Pure_White, elevation:15, borderRadius:15,marginLeft:15,marginRight:15}} onPress={()=> setModalPasswordCurrent(true)}>
                    <View style={{flexDirection:'row', gap:15}}>
                      <View style={{ padding:15, borderRadius:10, backgroundColor:colors.Black}}>
                            <Ionicons name="create-outline" size={25} color={colors.Pure_White}/>
                      </View>
                        <View style={{flexDirection:'column',marginTop:5}}>
                            <Text style={{fontFamily:font.medium,fontSize:16,color:colors.DARK_GREY}}>Senha</Text>
                            <Text style={{ fontFamily:font.regular,fontSize:12,color:'#8A959E'}}>*****</Text>
                        </View>    
                    </View>
                </TouchableOpacity>
                <CustomModal visible={modalPasswordCurrent} onClose={()=> setModalPasswordCurrent(false)} title="Alterar Senha" titleButon="Salvar">
                    <Text>Digite nova senha de 6 digitos:</Text>
                    <TextInput placeholder="Senha" style={{ borderBottomWidth: 0.5,borderBottomColor:colors.text.cinza, width: 200, marginTop: 10 }} keyboardType="numeric"/>
                </CustomModal>

                <TouchableOpacity style={{padding:15, gap:15, backgroundColor:colors.Pure_White, elevation:15, borderRadius:15,marginLeft:15,marginRight:15}} onPress={()=> setModalEmail(true)}>
                    <View style={{flexDirection:'row', gap:15}}>
                      <View style={{ padding:15, borderRadius:10, backgroundColor:colors.Black}}>
                            <Ionicons name="create-outline" size={25} color={colors.Pure_White}/>
                      </View>
                        <View style={{flexDirection:'column',marginTop:5}}>
                            <Text style={{fontFamily:font.medium,fontSize:16,color:colors.DARK_GREY}}>E-mail</Text>
                            <Text style={{ fontFamily:font.regular,fontSize:12,color:'#8A959E'}}>{userEmail}</Text>
                        </View>    
                    </View>
                </TouchableOpacity> 
                <CustomModal visible={modalEmail} onClose={()=> setModalEmail(false)} title="Alterar E-mail" titleButon="Salvar">
                    <Text>Digite novo endereço de e-mail</Text>
                    <TextInput placeholder="E-mail" style={{ borderBottomWidth: 0.5,borderBottomColor:colors.text.cinza, width: 200, marginTop: 10 }}/>
                </CustomModal>  

                <View style={{padding:15, gap:15, backgroundColor:colors.Pure_White, elevation:15, borderRadius:15,marginLeft:15,marginRight:15}}>
                    <TouchableOpacity style={{flexDirection:'row', gap:15}} onPress={()=> setModalPhone(true)}>
                      <View style={{ padding:15, borderRadius:10, backgroundColor:colors.Black}}>
                            <Ionicons name="create-outline" size={25} color={colors.Pure_White}/>
                      </View>
                        <View style={{flexDirection:'column',marginTop:5}}>
                            <Text style={{fontFamily:font.medium,fontSize:16,color:colors.DARK_GREY}}>Telefone</Text>
                            <Text style={{ fontFamily:font.regular,fontSize:12,color:'#8A959E'}}>{userPhone}</Text>
                        </View>    
                    </TouchableOpacity>
                <CustomModal visible={modalPhone} onClose={()=> setModalPhone(false)} title="Alterar Telefone" titleButon="Salvar">
                    <Text>Digite novo telefone:</Text>
                    <TextInput placeholder="41 99999999" style={{ borderBottomWidth: 0.5,borderBottomColor:colors.text.cinza, width: 200, marginTop: 10 }} keyboardType="numeric"/>
                </CustomModal>
                </View>
            </View>
            </LinearGradient>   
        </View>
    )
}