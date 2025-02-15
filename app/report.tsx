import { View, Text, ScrollView } from "react-native";
import { Header } from "@/components/header";
import { styles_report } from "@/styles/css_report";

export default function Report(){
    return(
    <ScrollView>
        <View style={styles_report.container}>
            <Header/>
            <Text>Testando relatorios</Text>
        </View>
    </ScrollView>
    )
}