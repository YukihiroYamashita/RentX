import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { useTheme } from 'styled-components';

import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import Acessory from '../../components/Acessory';
import Button from '../../components/Button';

import SpeedSvg from '../../assets/speed.svg'
import AccelerationSvg from '../../assets/acceleration.svg'
import ForceSvg from '../../assets/force.svg'
import GasolineSvg from '../../assets/gasoline.svg'
import ExchangeSvg from '../../assets/exchange.svg'
import PeopleSvg from '../../assets/people.svg'

import theme from '../../styles/theme';

import { 
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Price, 
  Period,
  Acessories,
  Footer,
  RentalPeriod,
  DateInfo,
  CalendarIcon,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal
} from './styles';

const SchedulingDetails: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleConfirm() { 
    navigation.navigate("SchedulingComplete");
  };

  return (
    <Container>
      <Header>
        <BackButton
          onPress={() => {}}
        />
      </Header>
      
      <CarImages>
        <ImageSlider 
          imagesUrl={['https://png.monster/wp-content/uploads/2020/11/2018-audi-rs5-4wd-coupe-angular-front-5039562b.png']}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>LAMBORGHINI</Brand>
            <Name>Huracan</Name>
          </Description>
          
          <Rent>
            <Period>AO DIA</Period>
            <Price>R$680</Price>
          </Rent>
        </Details>

        <Acessories>
          <Acessory 
            name="380Km/h"
            icon={SpeedSvg}
          />
          <Acessory 
            name="3.2s"
            icon={AccelerationSvg}
          />
          <Acessory 
            name="800 HP"
            icon={ForceSvg}
          />
          <Acessory 
            name="Gasolina"
            icon={GasolineSvg}
          />
          <Acessory 
            name="Auto"
            icon={ExchangeSvg}
          />
          <Acessory 
            name="2 pessoas"
            icon={PeopleSvg}
          />
        </Acessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />
           
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>

        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580 x 3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirm}
        />
      </Footer>
    </Container>
  );
}

export default SchedulingDetails;