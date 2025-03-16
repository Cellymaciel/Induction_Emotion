import { View, Text } from "react-native";
import { VideoList_Happy } from "@/components/InducingVideos";
import { Header } from "@/components/headers/header";
import { Camera } from "@/components/camera";
export default function Inducing(){
    return(
        <View style={{padding:15}}>
            <Header/>
            <VideoList_Happy/>
            <Camera/>
        </View>
    )
}