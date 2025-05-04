import React, { useState } from "react";
import { View, Text , StyleSheet} from "react-native";
import { Picker } from '@react-native-picker/picker'
import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";

interface InputEmotionProps {
  onEmotionChange: (emotion: string) => void;
}

const emotions = ['Todas', 'Alegria', 'Tristeza', 'Raiva', 'Neutro', 'Medo', 'Surpresa', 'Nojo']; 

export function InputEmotion({ onEmotionChange }: InputEmotionProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<string>('Todas');

  const handleEmotionSelection = (itemValue: string) => {
    setSelectedEmotion(itemValue);
    onEmotionChange(itemValue);
  };

  return (
    <View style={s.container}>
      <Text style={s.label}>Filtrar Emoção</Text>
      <View style={s.pickerContainer}>
        <Picker
          selectedValue={selectedEmotion}
          onValueChange={handleEmotionSelection}
          style={s.picker}
        >
          {emotions.map((emotion) => (
            <Picker.Item key={emotion} label={emotion} value={emotion} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    
  },
  label: {
    fontSize: 14,
    fontFamily: font.light,
    color: colors.cinzas[800],
    marginBottom: 3,
    marginLeft: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.cinzas[400],
    borderRadius: 10,
    backgroundColor: colors.Pure_White,
    height: 49,
    width:170,
    justifyContent: 'center',
  },
  picker: {
    color: colors.cinzas[800],
  },
})