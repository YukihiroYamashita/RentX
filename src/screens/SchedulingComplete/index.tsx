import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import ConfirmButton from '../../components/ConfirmButton';

import { 
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles';

const SchedulingComplete: React.FC = () => {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  function handleConfirm() { 
    navigation.navigate("Home");
  };

  return (
    <Container>
      <LogoSvg
        width={width}
      />
      
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel...
        </Message>
      </Content>

      <Footer>
        <ConfirmButton
          title='OK'
          onPress={handleConfirm}
        />
      </Footer>
    </Container>
  );
}

export default SchedulingComplete;