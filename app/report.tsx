import { View, Text, ScrollView } from "react-native";
import { Header } from "@/components/header";
import { styles_report } from "@/styles/css_report";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";

export default function Report(){
    return(
    <ScrollView>
        <View style={styles_report.container}>
          <View style={styles_report.header}>
            <Text style={styles_report.titleHeader}>Relatório Geral</Text>
            <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                <Ionicons name="download-outline" size={18} color={colors.White}/>
                <Text style={styles_report.textIcon}>Baixar</Text>
            </View>
          </View>
          <View style={styles_report.containerAll}>
            <View style={styles_report.contText}>
                <Text style={styles_report.textTitle}>Selecione um filtro para a geração do relatório:</Text>
            </View>
          </View>
        </View>
    </ScrollView>
    )
}