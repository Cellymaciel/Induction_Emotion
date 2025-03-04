import { View, Text } from "react-native";
import { VideoList_Happy } from "@/components/videosHappy";
import { Header } from "@/components/headers/header";

export default function Inducing(){
    return(
        <View style={{padding:15}}>
            <Header/>
            <VideoList_Happy/>
        </View>
    )
}