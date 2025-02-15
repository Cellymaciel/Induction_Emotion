import { View, Text } from "react-native"
import { style_perfil } from "@/styles/css_perfil"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "@/constants/Colors"
import { font } from "@/constants/font"
import { LinearGradient } from 'expo-linear-gradient';

export default function Perfil(){
    return(
        <View style={style_perfil.container}>
        <LinearGradient
                colors={[colors.Black, colors.White]} // Definição das cores
                start={{ x: 0, y: 0 }} // Começa no canto esquerdo
                end={{ x: 1, y: 0 }} // Termina no canto direito
                  >
                 <View style={style_perfil.box_first}>
                <View style={{flexDirection:'row', gap:270 , marginTop:15, marginLeft:15}}>
                    <Ionicons name="settings" color={colors.White} size={30}/>
                    <Ionicons name="notifications" color={colors.White} size={30}/>
                </View>
                <View style={{alignItems:'center', justifyContent:'center', marginTop:35}}>
                    <Text style={{fontFamily:font.bold, color:colors.Pure_White, fontSize:36}}>Marcelly Maciel</Text>
                </View>
                <View style={{marginTop:10, alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontFamily:font.regular, fontSize:14, color:colors.Pure_White}}>
                        email.example@gmail.com
                    </Text>
                </View>
                <View style={{width:'90%',height:0.5,backgroundColor:'#9FBFF4',marginTop:25,marginLeft:20 }}/>
                <View style={{justifyContent:'center', alignItems:'center', marginTop:22, padding:15}}>
                    <Text style={{fontFamily:font.light, fontSize:12, textAlign:'center' ,color:colors.Pure_White}}>Usuário concedeu permissão para o uso de sua imagem em pesquisa acadêmica, garantindo sua utilização sem fins lucrativos.</Text>
                </View>
            </View>

            <View style={style_perfil.box_second}>
                <View style={{padding:15, gap:15, backgroundColor:colors.Pure_White, elevation:15, borderRadius:15,marginLeft:15,marginRight:15}}>
                    <View style={{flexDirection:'row', gap:15}}>
                      <View style={{ padding:15, borderRadius:10, backgroundColor:colors.Black}}>
                            <Ionicons name="create-outline" size={25} color={colors.Pure_White}/>
                      </View>
                        <View style={{flexDirection:'column',marginTop:5}}>
                            <Text style={{fontFamily:font.medium,fontSize:16,color:colors.DARK_GREY}}>Nome e sobrenome</Text>
                            <Text style={{ fontFamily:font.regular,fontSize:12,color:'#8A959E'}}>Marcelly Maciel</Text>
                        </View>    
                    </View>
                </View>
                <View style={{padding:15, gap:15, backgroundColor:colors.Pure_White, elevation:15, borderRadius:15,marginLeft:15,marginRight:15}}>
                    <View style={{flexDirection:'row', gap:15}}>
                      <View style={{ padding:15, borderRadius:10, backgroundColor:colors.Black}}>
                            <Ionicons name="create-outline" size={25} color={colors.Pure_White}/>
                      </View>
                        <View style={{flexDirection:'column',marginTop:5}}>
                            <Text style={{fontFamily:font.medium,fontSize:16,color:colors.DARK_GREY}}>Senha</Text>
                            <Text style={{ fontFamily:font.regular,fontSize:12,color:'#8A959E'}}>*******</Text>
                        </View>    
                    </View>
                </View>
                <View style={{padding:15, gap:15, backgroundColor:colors.Pure_White, elevation:15, borderRadius:15,marginLeft:15,marginRight:15}}>
                    <View style={{flexDirection:'row', gap:15}}>
                      <View style={{ padding:15, borderRadius:10, backgroundColor:colors.Black}}>
                            <Ionicons name="create-outline" size={25} color={colors.Pure_White}/>
                      </View>
                        <View style={{flexDirection:'column',marginTop:5}}>
                            <Text style={{fontFamily:font.medium,fontSize:16,color:colors.DARK_GREY}}>E-mail</Text>
                            <Text style={{ fontFamily:font.regular,fontSize:12,color:'#8A959E'}}>email.example@gmail.com</Text>
                        </View>    
                    </View>
                </View>   <View style={{padding:15, gap:15, backgroundColor:colors.Pure_White, elevation:15, borderRadius:15,marginLeft:15,marginRight:15}}>
                    <View style={{flexDirection:'row', gap:15}}>
                      <View style={{ padding:15, borderRadius:10, backgroundColor:colors.Black}}>
                            <Ionicons name="create-outline" size={25} color={colors.Pure_White}/>
                      </View>
                        <View style={{flexDirection:'column',marginTop:5}}>
                            <Text style={{fontFamily:font.medium,fontSize:16,color:colors.DARK_GREY}}>Telefone</Text>
                            <Text style={{ fontFamily:font.regular,fontSize:12,color:'#8A959E'}}>41 9 99999999</Text>
                        </View>    
                    </View>
                </View>
            </View>
            </LinearGradient>   
        </View>
    )
}