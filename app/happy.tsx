import { View, Text } from "react-native";
import { VideoList_Happy } from "@/components/videosHappy";
import { Header } from "@/components/header";
export default function Happy(){
    return(
        <View style={{padding:15}}>
            <Header/>
            <VideoList_Happy/>
        </View>
    )
}