import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { styles_report } from "@/styles/css_report";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import { InputEmotion } from "@/components/inputEmotion";
import { InputDate } from "@/components/inputDate";
import { BarGraph } from "@/components/barGraph";
import { PieGraph } from "@/components/pieGraph";
import { EmotionComparisonGraph } from "@/components/barGraph/emotionComparisonGraph";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { getUserEmail } from "@/utils/infos";
import { configs } from "@/utils/configs";

interface InducingResponse {
  user: any; 
  dataInicio: string;
  dataFim: string;
  emocaoEscolha: string;
  emocaoDominate: string ;
  idInducion: number;
  allDetectedEmotions: string[];
  detailsInducing: { video: number; emotionsDominates: string[] }[];
}




export default function Report(){


  const searchParams = useSearchParams()
  const  email = String(searchParams.get('email')) || "";
  const [inducingData, setInducingData] = useState<InducingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredInducingData, setFilteredInducingData] = useState<InducingResponse[]>([]);
  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);
  const [filterEmotion, setFilterEmotion] = useState<string | null>(null);


  useEffect(() => {
    const fetchUserReport = async()=>{
        const storedEmail = await getUserEmail(email);
        getUserEmail(storedEmail);
        console.log(storedEmail)
        try{
            const response = await fetch(configs.baseURL+`/inducing/user/${storedEmail}`,{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(response.status === 200){
                const data = await response.json();
                setInducingData(data);
                console.log("dados obtidos hehehh!");
            }else{
                Alert.alert("Erro", "Ocorreu um erro ao buscar os dados ");
            }
        }catch(error){
            console.error("Erro ao busca os dados");
        } finally {
            setLoading(false);
        }
    };
    fetchUserReport()
} ,[]);

const handleDateChange = (start: Date, end: Date) => {
  setFilterStartDate(start);
  setFilterEndDate(end);
};

const handleEmotionChange = (emotion: string) => {
  setFilterEmotion(emotion);
};

const applyFilters = () => {
  let filteredData = [...inducingData];

  if (filterStartDate) {
    filteredData = filteredData.filter(
      (item) => new Date(item.dataInicio) >= filterStartDate
    );
  }

  if (filterEndDate) {
    filteredData = filteredData.filter(
      (item) => new Date(item.dataInicio) <= filterEndDate
    );
  }

  if (filterEmotion && filterEmotion !== 'Todas') { // Assumindo que 'Todas' seja uma opção no seu InputEmotion
    filteredData = filteredData.filter(
      (item) => item.emocaoEscolha.toLowerCase() === filterEmotion.toLowerCase()
    );
  }

  setFilteredInducingData(filteredData);
};

// Dados para os gráficos (usando filteredInducingData agora)
const dataToUse = filteredInducingData.length > 0 ? filteredInducingData : inducingData;

const emotionCountsForBarGraph = dataToUse.reduce((acc, inducing) => {
  inducing.allDetectedEmotions.forEach((emotion) => {
    const key = emotion.toLowerCase();
    acc[key] = (acc[key] || 0) + 1;
  });
  return acc;
}, {} as Record<string, number>);

const barGraphData = Object.entries(emotionCountsForBarGraph).map(([emotion, count]) => ({
  emotion,
  count,
}));

const totalInductions = dataToUse.length;
const correctPredictionsCount = dataToUse.filter(
  (inducing) => inducing.emocaoDominate?.toLowerCase() === inducing.emocaoEscolha.toLowerCase()
).length;

const allEmotionsForAllInductions = dataToUse.map((inducing) => inducing.allDetectedEmotions);

  

    return(
    <ScrollView>
        <View style={styles_report.container}>
          <View style={styles_report.header}>
            <Text style={styles_report.titleHeader}>Relatório Geral</Text>
            <TouchableOpacity>
              <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                  <Ionicons name="download-outline" size={18} color={colors.White}/>
                  <Text style={styles_report.textIcon}>Baixar</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles_report.containerAll}>
            <View style={styles_report.contText}>
                <Text style={styles_report.textTitle}>Selecione um filtro para a geração do relatório:</Text>
                <View style={styles_report.contInputs}>
                  <InputDate onDateChange={handleDateChange}/>
                </View>
                <View style={{justifyContent:'space-between', marginTop:10,flexDirection:"row", gap:10 }}>
                  <InputEmotion  onEmotionChange={handleEmotionChange}/>
                  <TouchableOpacity style={styles_report.btn} onPress={applyFilters}>
                    <Text style={{color:colors.White}}>Filtrar</Text>
                  </TouchableOpacity>
                </View>
            </View>
            <View style={{marginBottom:70}}>
                <BarGraph emotionCounts={barGraphData}/>
                {inducingData.length > 0 && (
                   <PieGraph
                        title={"Variação de Humores"}
                         allDetectedEmotions={allEmotionsForAllInductions}
                      />
                    )}
                <EmotionComparisonGraph correctPredictionsCount={correctPredictionsCount} totalInductions={totalInductions}/>
            </View>
          </View>
        </View>
    </ScrollView>
    )
}