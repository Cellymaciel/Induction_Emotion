import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet
} from 'react-native';
import { colors } from '@/constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { font } from '@/constants/font';

export function InputDate() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const onChangeStart = (event: unknown, selectedDate?: Date) => {
    if (selectedDate) {
      setStartDate(selectedDate);
    }
    setShowStart(false);
  };

  const onChangeEnd = (event: unknown, selectedDate?: Date) => {
    if (selectedDate) {
      setEndDate(selectedDate);
    }
    setShowEnd(false);
  };

  return (
    <View style={s.container}>
      {/* Data Inicial */}
      <View style={s.containerLabel}>
        <Text style={s.label}>Data Inicial</Text>
        <TouchableOpacity
          style={s.datePickerButton}
          onPress={() => setShowStart(true)}
        >
          <Text style={s.datePickerText}>
            {startDate.toLocaleDateString('pt-BR')}
          </Text>
          <Ionicons name="calendar-clear-outline" color={colors.cinzas[800]} size={16} />
        </TouchableOpacity>
        {showStart && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onChange={onChangeStart}
          />
        )}
      </View>

      {/* Data Final */}
      <View style={s.containerLabel}>
        <Text style={s.label}>Data Final</Text>
        <TouchableOpacity
          style={s.datePickerButton}
          onPress={() => setShowEnd(true)}
        >
          <Text style={s.datePickerText}>
            {endDate.toLocaleDateString('pt-BR')}
          </Text>
          <Ionicons name="calendar-clear-outline" color={colors.cinzas[800]} size={16} />
        </TouchableOpacity>
        {showEnd && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onChange={onChangeEnd}
          />
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap:10
  },
  containerLabel: {
    width: 170
  },
  label: {
    fontSize: 14,
    fontFamily:font.light,
    color: colors.cinzas[800],
    marginBottom: 3,
    marginLeft:4
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
    backgroundColor: colors.Pure_White
  },
  datePickerText: {
    fontSize: 16,
    color: colors.cinzas[800]
  }
});
