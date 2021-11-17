import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Alert } from 'react-native';

import { format } from 'date-fns';

import BackButton from '../../components/BackButton';
import { Calendar, DayProps, MarkedDateProps, generateInterval } from '../../components/Calendar';
import Button from '../../components/Button';

import CarDTO from '../../dtos/CarDTO';
import ArrowSvg from '../../assets/arrow.svg';
import { getPlatformDate } from '../../utils/getPlatformDate';

import { 
  Container,
  Header,
  Title,
  RentPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles';


interface RentalPeriod { 
  start: string;
  end: string;
}

interface Params { 
  car: CarDTO
}

const Schedules: React.FC = () => {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const { car } = route.params as Params;

  function handleConfirmRental() { 
    if(!rentalPeriod.start || !rentalPeriod.end) { 
      Alert.alert('Selecione o intervalo para alugar.')
    } else { 
      navigation.navigate("SchedulingDetails", {
        car,
        dates: Object.keys(markedDates)
      });
    }
  };

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp) {
      start = end;
      end = start;
    };

    setLastSelectedDate(end);

    const interval = generateInterval(start, end);

    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];
    
    setRentalPeriod({
      start: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy')
    });
  }

  return (
    <Container>
      <Header>
        <BackButton 
          onPress={() => navigation.goBack()}
          color={theme.colors.shape}
        />
        
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.start}>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <ArrowSvg/>

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.end}>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.start}
        />
      </Footer>
    </Container>
  );
}

export default Schedules;