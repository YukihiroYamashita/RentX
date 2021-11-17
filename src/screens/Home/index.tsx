import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons'

import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';

import Logo from '../../assets/logo.svg';
import api from '../../service/api';

import CarDTO from '../../dtos/CarDTO';

import LoadAnimation from '../../components/LoadAnimation';
import Car from '../../components/Car';

import { 
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
} from './styles';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

const Home: React.FC = () => {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const navigation = useNavigation();
  const theme = useTheme();

  useEffect(() => { 
    async function fetchCars() { 
      try {
        setLoading(true);
        const { data } = await api.get('/cars');

        setCars(data);
      } catch(err) { 
        console.log(err)
      } finally { 
        setLoading(false)
      }
     };

    fetchCars()
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, [])

  function handleCarDetails(car:CarDTO) { 
    navigation.navigate("CarDetails", { car });
  }

  function handleOpenMyCars() { 
    navigation.navigate("MyCars");
  };

  const myCarsButtonStyle = useAnimatedStyle(() => { 
    return { 
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() { 
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });

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
          {
            !loading && 
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
          
        </HeaderContent>
      </Header>
      {loading ? <LoadAnimation/> : 
        <CarList
          data={cars}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Car
              data={item}
              onPress={() => handleCarDetails(item)}
            />
          )}
        />
      }

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22
            }
          ]}  
        >
          <ButtonAnimated 
            onPress={handleOpenMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  )
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Home;