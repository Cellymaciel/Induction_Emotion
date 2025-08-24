import { Text, View } from "react-native";
import { Header } from "@/components/headers/header";
import { style_index } from "@/styles/css_index";
import { Title_Header } from "@/components/headers/title_header";
import { Staps } from "@/components/staps";
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from "react-native";

export default function Home(){
  const searchParams = useLocalSearchParams();
const { nome , email, telefone} = searchParams;
    return(
          <ScrollView style={style_index.container}>
              <Header/>
              <Title_Header/>
              <Staps/>
           </ScrollView>
    )
}