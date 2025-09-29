import { View, Text, ScrollView, TouchableOpacity, Alert, Platform } from "react-native";
import { styles_report } from "@/styles/css_report";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import { InputEmotion } from "@/components/inputEmotion";
import { InputDate } from "@/components/inputDate";
import { BarGraph } from "@/components/barGraph";
import { PieGraph } from "@/components/pieGraph";
import { EmotionComparisonGraph } from "@/components/barGraph/emotionComparisonGraph";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { getUserEmail } from "@/utils/infos";
import { configs } from "@/utils/configs";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { htmlPDF } from "@/components/htmlPDF";
import ViewShot, { captureRef } from 'react-native-view-shot'; 


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


  const searchParams = useLocalSearchParams()
  const email = String(searchParams.email || "")
  const [inducingData, setInducingData] = useState<InducingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredInducingData, setFilteredInducingData] = useState<InducingResponse[]>([]);
  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);
  const [filterEmotion, setFilterEmotion] = useState<string | null>(null);
  const barGraphRef = useRef<ViewShot>(null as unknown as ViewShot); 
  const pieGraphRef = useRef<ViewShot>(null as unknown as ViewShot);   
  const comparisonGraphRef = useRef<ViewShot>(null as unknown as ViewShot);


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

  if (filterEmotion && filterEmotion !== 'Todas') {
    filteredData = filteredData.filter(
      (item) => item.emocaoEscolha === filterEmotion
    );
  }

  setFilteredInducingData(filteredData);
};



  
const captureGraph = async (ref: React.RefObject<View>): Promise<string | null> => {
  try {
    if (ref.current) {
      const uri = await captureRef(ref, {
        format: 'png',
        quality: 1, 
      });
      return uri;
    }
    return null;
  } catch (error) {
    console.error("Erro ao capturar o gráfico:", error);
    return null;
  }
};
const captureViewAsBase64 = useCallback(async (ref: React.RefObject<ViewShot>): Promise<string | null> => { 
  if (ref.current) {
      try {
          const result = await captureRef(ref, {
              format: "png",
              quality: 0.9,
              result: "base64",
          });
          return `data:image/png;base64,${result}`;
      } catch (error) {
          console.error("Erro ao capturar view:", error);
          return null;
      }
  } else {
      console.warn("Ref da view não está definida.");
      return null;
  }
}, []);

const handleDownloadPDF = async () => {
  setLoading(true);
  try {
      const barGraphBase64 = await captureViewAsBase64(barGraphRef);
      const pieGraphBase64 = await captureViewAsBase64(pieGraphRef);
      const comparisonGraphBase64 = await captureViewAsBase64(comparisonGraphRef);

      let htmlContent = htmlPDF({
          title: 'Relatório de Emoções',
          data: filteredInducingData.length > 0 ? filteredInducingData : inducingData,
          barGraphBase64: barGraphBase64 ?? "",
          pieGraphBase64: pieGraphBase64 ?? "",
          comparisonGraphBase64: comparisonGraphBase64 ?? "",
      });

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log('Arquivo PDF salvo em:', uri);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });

  } catch (error) {
      console.error("Erro ao gerar e compartilhar o PDF:", error);
      Alert.alert("Erro", "Ocorreu um erro ao gerar e compartilhar o PDF.");
  } finally {
      setLoading(false);
  }
};
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
  (inducing) => inducing.emocaoDominate === inducing.emocaoEscolha).length;

const allEmotionsForAllInductions = dataToUse.map((inducing) => inducing.allDetectedEmotions);
    return(
    <ScrollView>
        <View style={styles_report.container}>
          <View style={styles_report.header}>
            <Text style={styles_report.titleHeader}>Relatório Geral</Text>
            <TouchableOpacity onPress={handleDownloadPDF}>
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
            <ViewShot ref={barGraphRef}>
                        <BarGraph emotionCounts={barGraphData} />
                    </ViewShot>
                    {inducingData.length > 0 && (
                        <ViewShot ref={pieGraphRef}>
                            <PieGraph
                                title={"Variação de Humores"}
                                allDetectedEmotions={allEmotionsForAllInductions}
                            />
                        </ViewShot>
                    )}
                    <ViewShot ref={comparisonGraphRef}>
                        <EmotionComparisonGraph correctPredictionsCount={correctPredictionsCount} totalInductions={totalInductions} />
                    </ViewShot>
            </View>
          </View>
        </View>
    </ScrollView>
    )
}
