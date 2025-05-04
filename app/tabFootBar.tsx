import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "@/app/home";

import { View } from "react-native";
import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";
import { Ionicons } from "@expo/vector-icons";
import Perfil from "./perfil";
import Report from "./report";
import { useEffect, useState } from "react";
import { getUserEmail } from "@/utils/infos";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDadosDoUsuario() {
      const storedEmail = await getUserEmail();
      setUserEmail(storedEmail);
    }

    carregarDadosDoUsuario();
  }, []);
    return (     
        <Tab.Navigator screenOptions={{headerShown:false, tabBarStyle:{
            backgroundColor:colors.Pure_White,
             height:85,
          
             alignItems:'center',
             justifyContent:'center',
             borderTopRightRadius:40,
             borderTopLeftRadius:40,
             elevation:15,
             position:'absolute',
             borderColor:'#DCDCDC',
             borderWidth:1
            },
             tabBarLabelStyle:{fontSize:14, fontFamily:font.light, color:colors.DARK_GREY},
            
             }}>
            <Tab.Screen name="Inicio" component={Home} options={{
                tabBarIcon:({color, size}) => (
                    <Ionicons name="home-outline" color={colors.Black} size={24}/>
                ), tabBarIconStyle:{marginTop:15}
            }} />
            <Tab.Screen name="Relatórios" component={Report} options={{
                tabBarIcon:({color, size}) => (
                    <Ionicons name="clipboard-outline" color={colors.Black} size={24}/>
                ), tabBarIconStyle:{marginTop:15}
            }} />
            <Tab.Screen name="Usuário" component={Perfil} options={{
                tabBarIcon:({color, size}) => (
                    <Ionicons name="person-outline" color={colors.Black} size={24}/>
                ), tabBarIconStyle:{marginTop:15}
            }} />
        </Tab.Navigator>
    
    );
}