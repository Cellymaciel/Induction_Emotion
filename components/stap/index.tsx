import { View, Text, TouchableOpacity , Image} from "react-native";
import { style_stap } from "./css_index";
import {router } from "expo-router";

type ImageKey = 'alegria' | 'tristeza'| 'assustado'|'raiva'|'calmo'

const imageMap : Record<ImageKey, any> ={
    alegria: require('@/assets/images/emotions/alegria.png'),
    tristeza: require('@/assets/images/emotions/tristeza.png'),
    assustado: require('@/assets/images/emotions/assustado.png'),
    raiva: require('@/assets/images/emotions/raiva.png'),
    calmo: require('@/assets/images/emotions/calmo.png')

}
type Props ={
    title: string,
    description: string
    screenName: string
    imagem: ImageKey | string
    emotionInduction: string
}

export function Stap ({title, description, imagem, screenName, emotionInduction}: Props){
    const imageSource = imageMap[imagem as ImageKey] || { uri: imagem }

    return(
        <TouchableOpacity onPress={()=> router.navigate({pathname :screenName, params:{ emotionInduction : emotionInduction}})}>          
            <View style={style_stap.container} >
            <Image source={imageSource} style={style_stap.img} />           
                 <View style={style_stap.box_text}>
                    <Text style={style_stap.title}>{title}</Text>
                    <Text style={style_stap.description}>{description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}