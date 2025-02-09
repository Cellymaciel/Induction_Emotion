import { View, Text, TouchableOpacity } from "react-native";
import { style_stap } from "./css_index";
import { useNavigation } from "expo-router";

type Props ={
    title: string,
    description: string
    color?: string
    screenName: string
    
}

export function Stap ({title, description, color, screenName}: Props){
    const navigation = useNavigation()
    return(
        <TouchableOpacity onPress={()=> navigation.navigate(screenName)}>          
            <View style={style_stap.container} >
                <View  style={[style_stap.view, {backgroundColor: color}]}></View>
                <View style={style_stap.box_text}>
                    <Text style={style_stap.title}>{title}</Text>
                    <Text style={style_stap.description}>{description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}