import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import {
  Button,
  Caption,
  Headline,
  Text,
  Title as T,
} from "react-native-paper";
import { INavProps } from "../../shared/interfaces/NavigationProps";

const LandingPage: React.FC<INavProps> = ({ navigation }) => {
  return (
    <Container>
      <ImageContainer>
        <Imagem
          source={{
            uri: "https://cdni.iconscout.com/illustration/premium/thumb/man-using-mobile-phone-2839467-2371260.png",
          }}
        ></Imagem>
      </ImageContainer>
      <AuthContainer>
        <View>
          <Title>Talk to your friends</Title>
          <Subtitle>Let your friends know what you are doing now.</Subtitle>
        </View>
        <ButtonsContainer>
          <RegisterButton
            uppercase={false}
            onPress={() => navigation.navigate("SignUp")}
          >
            <ButtonText>Register</ButtonText>
          </RegisterButton>
          <SignInButton
            uppercase={false}
            onPress={() => navigation.navigate("SignIn")}
          >
            <ButtonText>Sign In</ButtonText>
          </SignInButton>
        </ButtonsContainer>
      </AuthContainer>
    </Container>
  );
};

export const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

export const Imagem = styled.Image`
  width: 70%;
  height: 70%;
`;

export const ImageContainer = styled.View`
  background-color: ${(props) => props.theme.colors.accent};
  border-radius: ${(props) => props.theme.roundness}px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const AuthContainer = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
`;

export const ButtonsContainer = styled.View`
  border-radius: ${(props) => props.theme.roundness}px;
  background-color: ${(props) => props.theme.colors.accent};
  border: 2px solid ${(props) => props.theme.colors.primary};
  width: 80%;
  flex-direction: row;
`;

export const RegisterButton = styled(Button)`
  flex: 1;
  border-radius: ${(props) => props.theme.roundness}px;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.primary};
  align-items: center;
  padding: 10px;
`;
export const SignInButton = styled(Button)`
  border-radius: ${(props) => props.theme.roundness}px;
  background-color: ${(props) => props.theme.colors.accent};
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const Title = styled(T)`
  color: ${(props) => props.theme.colors.text};
  font-weight: 100;
  font-size: 25px;
  text-align: center;
`;

export const Subtitle = styled(Caption)`
  font-size: 18px;
  margin-top: 30px;
  color: ${(props) => props.theme.colors.onSurface};
  text-align: center;
`;

export const ButtonText = styled(Title)`
  font-size: 18px;
  color: ${(props) => props.theme.colors.onSurface};
  margin-top: 10px;
  text-align: center;
  margin: 0;
`;

export default LandingPage;
