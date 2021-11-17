import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { generateInterval } from './generateInterval';

import {
  Calendar as CustomCalendar,
  LocaleConfig,
  } from 'react-native-calendars';

interface DateObject {
  day: number;
  dateString: string;
  month: number;
  timestamp: number;
  year: number;
}

import { ptBr } from './localeConfig';

LocaleConfig.locales['pt-BR'] =  ptBr;

LocaleConfig.defaultLocale = 'pt-BR'

interface MarkedDateProps {
  [date: string] : {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  }
};

interface DayProps { 
  dateString: string;
  day: string;
  month: string;
  year: string;
  timestamp: string;
}

interface CalendarProps { 
  markedDates: MarkedDateProps,
  onDayPress: (date: DateObject) => any;
}

const Calendar: React.FC<CalendarProps> = ({ markedDates, onDayPress }) => {
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={(direction) => 
        <Feather
          name={direction === 'left' ? "chevron-left" : "chevron-right"}
          size={24}
          color={theme.colors.text}
        />
      }
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10
      }}  
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        textMonthFontFamily: theme.fonts.secondary_500,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}

export {
  Calendar,
  MarkedDateProps,
  DayProps,
  generateInterval
};