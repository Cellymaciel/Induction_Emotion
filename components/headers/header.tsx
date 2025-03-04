import { Text, View } from "react-native";
import { styles_header } from "@/styles/css_header";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";

export function Header(){
    return(
        <View style={styles_header.container}>
           <View style={styles_header.box_icon}>
            <Ionicons name="aperture-sharp" size={18} color={colors.Pure_White}/>
           </View>
           <View style={{marginTop:13}}>
            <Text style={styles_header.text}>Inducing Emotions</Text>
           </View>
        </View>
    )
}