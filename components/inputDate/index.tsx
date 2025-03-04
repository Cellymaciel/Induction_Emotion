import React, { useState } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet
} from 'react-native'
import { colors } from '@/constants/Colors'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Ionicons } from '@expo/vector-icons'

export  function InputDate() {
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)

  const onChange = (event: unknown, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate)
    }
    setShow(false)
  }

  return (
    <View style={s.containerLabel}>
      <TouchableOpacity
        style={s.datePickerButton}
        onPress={() => setShow(true)}
      >
        <Text style={s.datePickerText}>
          {date.toLocaleDateString('pt-BR') || 'Selecionar Data'}
        </Text>
        <Ionicons name='calendar-clear-outline' color={colors.cinzas[800]} size={16}/>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          onChange={onChange}
        />
      )}
    </View>
  )
}

const s = StyleSheet.create({
  container: {},
  contentContainer: {
    paddingLeft: 30,
    paddingRight: 30
  },
  boxFilters: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginTop: 15
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 49,
    borderWidth: 1,
    borderColor: colors.cinzas[400],
    borderRadius: 10,
    backgroundColor: colors.cinzas[300]
  },
  datePickerText: {
    fontSize: 16,
    color: colors.cinzas[800]
  },
  containerLabel: {
    display: 'flex',
    gap: 8,
    width: '48%'
  }
})