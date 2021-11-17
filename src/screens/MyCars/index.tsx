import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { useTheme } from 'styled-components';

import CarDTO from '../../dtos/CarDTO';
import api from '../../service/api';

import BackButton from '../../components/BackButton';
import LoadAnimation from '../../components/LoadAnimation';
import Car from '../../components/Car';

import { 
  Container,
  Header,
  SubTitle,
  Title,
  Content, 
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate
} from './styles';

interface CarProps { 
  id: string;
  car: CarDTO;
  user_id: string;
  startDate: string;
  endDate: string;
}

const MyCars: React.FC = () => {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const navigation = useNavigation();
  const theme = useTheme();

  useEffect(() => {
    async function fetchCars() { 
      try {
        const response = await api.get(`/schedules_byuser?user_id=1`);
        setCars(response.data);
      } catch(err) { 
        console.log(err)
      } finally {
        setLoading(false);
      };
    };

    fetchCars()
  }, [])

  return (
    <Container>
      <Header>
        <BackButton 
          onPress={() => navigation.goBack()}
          color={theme.colors.shape}
        />
        
        <Title>
          Seus agendamentos, {'\n'}
          estão aqui
        </Title>
        
        <SubTitle>
          Conforto, segurança e praticidade
        </SubTitle>
      </Header>
      
      { loading ? <LoadAnimation/> : 
      (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            renderItem={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car}/>
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}

export default MyCars;