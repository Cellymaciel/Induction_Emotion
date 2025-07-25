import { Ionicons } from "@expo/vector-icons"
import { Text, View} from "react-native"
import { Stap } from "../stap"
import { style_staps } from "./css_index"
import { colors } from "@/constants/Colors"


export function Staps(){
    return(
        <View style={style_staps.container}>
            <View style={style_staps.box_txt_icon}>
                <Text style={style_staps.txt}>Escolha qual emoção deseja induzir : </Text>
                <View style={style_staps.box_txt_icon}>
                    <Ionicons name="filter-outline" color={colors.Black} size={28}/>
                </View>
            </View>
            <Stap
                imagem="tristeza"
                title="Tristeza"
                description="Sequência de videos tristes"
                screenName="inducing"
                emotionInduction="sad"
            />
            <Stap
                imagem="alegria"
                title="Alegre"
                description="Sequência de videos alegres"
                screenName="inducing"
                emotionInduction="happy"
            />
            <Stap
                imagem="raiva"
                title="Raiva"
                description="Sequência de videos raivosos"
                screenName="inducing"
                emotionInduction="angry"

            />
            <Stap
                imagem="assustado"
                title="Surpresa"
                description="Sequência de videos surpresos"
                screenName="inducing"
                emotionInduction="surprise"

            />
            <Stap
                imagem="calmo"
                title="Neutro"
                description="Sequência de videos neutros"
                screenName="inducing"
                emotionInduction="neutral"
            />

        </View>
    )
}