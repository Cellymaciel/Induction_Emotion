import { View, Text } from "react-native";
import { stles_titleHeader } from "@/styles/css_titleHeader";

export function Title_Header(){
    return(
        <View style={stles_titleHeader.container}>
            <Text style={stles_titleHeader.title1}>Olá!</Text>
            <Text style={stles_titleHeader.title2}>Vamos Induzir?</Text>
        </View>
    )
}