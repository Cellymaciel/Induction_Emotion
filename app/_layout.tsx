import { Inter_300Light, Inter_500Medium, Inter_400Regular, Inter_700Bold, useFonts} from "@expo-google-fonts/inter"
import { Stack } from "expo-router"
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
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="home"/>
            <Stack.Screen name="index"/>
            <Stack.Screen name="analyze"/>
            <Stack.Screen name="cadastro"/>
            <Stack.Screen name="tabFootBar"/>
            <Stack.Screen name="perfil"/>
            <Stack.Screen name="report"/>
            <Stack.Screen name="inducing"/>
        </Stack>
    )
}