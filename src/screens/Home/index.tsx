import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { 
  Container,
  Header,
  TotalCars,
  HeaderContent
} from './styles';

import Car from '../../components/Car';

const Home: React.FC = () => {
  const carDataOne = {
    brand: 'AUDI',
    name: 'RS 5 Coupé',
    rent: {
      period: 'AO DIA',
      price: 100,
    },
    thumbnail:'https://png.monster/wp-content/uploads/2020/11/2018-audi-rs5-4wd-coupe-angular-front-5039562b.png'
  };

  const carDataTwo = {
    brand: 'PORSHE',
    name: 'Panamera',
    rent: {
      period: 'AO DIA',
      price: 230,
    },
    thumbnail: 'https://www.pngkit.com/png/full/237-2375888_porsche-panamera-s.png'
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      <Car
        data={carDataOne}
      />

      <Car
        data={carDataTwo}
      />
    </Container>
  )
}

export default Home;