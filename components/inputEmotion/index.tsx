import React, { useState } from "react";
import { View, Text , StyleSheet} from "react-native";
import { Picker } from '@react-native-picker/picker'
import { colors } from "@/constants/Colors";
import { font } from "@/constants/font";

export function InputEmotion(){
  
    const [selectedEmotion, setSelectedEmotion] = useState('');

    return(
        <View style={s.container}>
            <View style={s.pickerWrapper}>
                <Picker selectedValue={selectedEmotion}
                        onValueChange={(itemValue) => setSelectedEmotion(itemValue)}
                        style={s.picker}
                        >
                    <Picker.Item label='Emoção' value= "" color="#999999" style={s.PickerText}/>
                    <Picker.Item label= 'Alegria' value= 'alegre' style={s.PickerText} />
                    <Picker.Item label= 'Tristeza' value = 'tristeza'style={s.PickerText} />
                    <Picker.Item label= 'Raiva' value = 'raiva'style={s.PickerText} />
                    <Picker.Item label= 'Surpresa' value = 'surpresa'style={s.PickerText} />
                    <Picker.Item label= 'Neutro' value = 'neutro'style={s.PickerText} />
                </Picker>
            </View>
        
        </View>
    )
}
const s = StyleSheet.create({
    container: {
     
      },
      pickerWrapper: {
        backgroundColor: colors.Pure_White,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.cinzas[400],
        width: 170,
        justifyContent: 'center',
        overflow:'visible'
      },
      picker: {
        height: 49,
        color: colors.text.cinza,
        paddingHorizontal: 10,
        
      },
        PickerText: {
        fontSize: 15,
        color: colors.cinzas[800],
        fontFamily:font.regular
      },
})