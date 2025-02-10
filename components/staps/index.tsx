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
                color="#0092D4"
                title="Tristeza"
                description="Sequência de videos tristes"
                screenName="sad"
            />
            <Stap
                color="#E6E951"
                title="Alegre"
                description="Sequência de videos alegres"
                screenName="happy"

            />
            <Stap
                color="#FF3737"
                title="Raiva"
                description="Sequência de videos raivosos"
                screenName="angry"

            />
            <Stap
                color="#AA0D95"
                title="Surpresa"
                description="Sequência de videos surpresos"
                screenName="surprise"

            />
            <Stap
                color="#64D476"
                title="Neutro"
                description="Sequência de videos neutros"
                screenName="neutral"

            />

        </View>
    )
}