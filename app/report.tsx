import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Header } from "@/components/headers/header";
import { styles_report } from "@/styles/css_report";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import { InputEmotion } from "@/components/inputEmotion";
import { InputDate } from "@/components/inputDate";
import { BarGraph } from "@/components/barGraph";
import { PieGraph } from "@/components/pieGraph";

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
                <View style={styles_report.contInputs}>
                  <InputEmotion/>
                  <InputDate/>
                </View>
                <View style={{alignSelf:'flex-end', marginTop:14,}}>
                  <TouchableOpacity style={styles_report.btn}>
                    <Text style={{color:colors.White}}>Filtrar</Text>
                  </TouchableOpacity>
                </View>
            </View>
            <View style={{marginBottom:70}}>
                <BarGraph/>
                <PieGraph/>
            </View>
          </View>
        </View>
    </ScrollView>
    )
}