import { Text, View } from "react-native";
import { Header } from "@/components/headers/header";
import { style_index } from "@/styles/css_index";
import { Title_Header } from "@/components/headers/title_header";
import { Staps } from "@/components/staps";
import { Tab_Foot } from "@/components/Tabs";

export default function Home(){
    return(
        <View style={style_index.container}>
          <Header/>
          <Title_Header/>
          <Staps/>
        </View>
    )
}