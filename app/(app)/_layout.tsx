import { TabFootBar } from "@/components/Tabs/tabFootBar"
import { colors } from "@/constants/Colors"
import { font } from "@/constants/font"
import { Inter_300Light, Inter_500Medium, Inter_400Regular, Inter_700Bold, useFonts} from "@expo-google-fonts/inter"
import { Ionicons } from "@expo/vector-icons"
import { Stack, Tabs } from "expo-router"
import { Text} from "react-native"

export default function Layout(){

    const [ fontsLoaded] = useFonts({
        Inter_300Light,
        Inter_400Regular,
        Inter_700Bold,
        Inter_500Medium
    })
    if(!fontsLoaded){
        return <Text> Carregando fonts</Text>
    }

    return(
       <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.Pure_White,
                    height: 85,
                    borderTopRightRadius: 40,
                    borderTopLeftRadius: 40,
                    elevation: 15,
                    position: 'absolute',
                    borderColor: '#DCDCDC',
                    borderWidth: 1,
                    paddingBottom:15
                    
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontFamily: font.light,
                    color: colors.DARK_GREY
                },
                tabBarIconStyle: {
                    marginTop: 15
                }
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Início',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={color} size={24}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="report"
                options={{
                    title: 'Relatórios',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="clipboard-outline" color={color} size={24}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="perfil"
                options={{
                    title: 'Usuário',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={24}/>
                    ),
                }}
            />
             <Tabs.Screen name="inducing" options={{ href: null, headerShown: false }} />
             <Tabs.Screen name="analyze" options={{ href: null , headerShown: false , tabBarStyle:{
                display: 'none'
             }}} />
        </Tabs>
    )
}