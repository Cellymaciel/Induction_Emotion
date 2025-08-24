import { Pressable, View , Text, TouchableOpacity} from "react-native";
import { style_btn_index } from "@/styles/css_button_index";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import { router, useNavigation } from "expo-router";

export function ButtonNew(){
    const navigate = useNavigation()
    return(
        <View style={style_btn_index.container} >
            <TouchableOpacity style={style_btn_index.btn} onPress={()=>  router.navigate('/home')}>
                <Ionicons name="caret-forward-circle-outline" size={22} color={colors.Pure_White} />
                <Text style={style_btn_index.text}>Nova indução</Text>
            </TouchableOpacity>
        </View>
    )
}