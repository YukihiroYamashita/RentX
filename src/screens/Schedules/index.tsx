import React from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/core';

import BackButton from '../../components/BackButton';
import Calendar from '../../components/Calendar';
import Button from '../../components/Button';

import ArrowSvg from '../../assets/arrow.svg';

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

const Schedules: React.FC = () => {
  const theme = useTheme();

  const navigation = useNavigation();

  function handleConfirmRental() { 
    navigation.navigate("SchedulingDetails");
  };

  return (
    <Container>
      <Header>
        <BackButton 
          onPress={() => {}}
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
            <DateValue selected={false}>18/12/2021</DateValue>
          </DateInfo>

          <ArrowSvg/>

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>25/12/2021</DateValue>
          </DateInfo>
        </RentPeriod>
      </Header>

      <Content>
        <Calendar/>
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}

export default Schedules;