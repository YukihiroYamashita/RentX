import React from 'react';

import { useNavigation } from '@react-navigation/core';

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
  About,
  Acessories,
  Footer
} from './styles';

const CarDetails: React.FC = () => {
  const navigation = useNavigation();

  function handleConfirmRental() { 
    navigation.navigate("Schedules");
  }

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

        <About>
          The Lamborghini Huracán is the perfect fusion of technology and design.
          With its crisp, streamlined lines, designed to cut through the air and 
          tame the road 
        </About>
      </Content>

      <Footer>
        <Button
          title="Escolher periodo do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}

export default CarDetails;