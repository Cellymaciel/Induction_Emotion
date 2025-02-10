import { Text, View } from "react-native";
import { Header } from "@/components/header";
import { style_index } from "@/styles/css_index";
import { Title_Header } from "@/components/title_header";
import { Staps } from "@/components/staps";
import { ButtonIndex } from "@/components/buttons/buton_index";
export default function Index(){
    return(
        <View style={style_index.container}>
          <Header/>
          <Title_Header/>
          <Staps/>
        </View>
    )
}