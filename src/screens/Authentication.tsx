import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const Authentication = () => {
  const navigation = useNavigation();
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
          <RegisterButton onPress={() => navigation.navigate("SignIn")}>
            <ButtonText>Register</ButtonText>
          </RegisterButton>
          <SignInButton onPress={() => navigation.navigate("SignIn")}>
            <ButtonText>Sign In</ButtonText>
          </SignInButton>
        </ButtonsContainer>
      </AuthContainer>
    </Container>
  );
};

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const Imagem = styled.Image`
  width: 70%;
  height: 70%;
`;

export const ImageContainer = styled.View`
  flex: 1;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

export const AuthContainer = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
`;

export const ButtonsContainer = styled.View`
  width: 80%;
  flex-direction: row;
  background-color: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius};
`;

export const RegisterButton = styled.TouchableOpacity`
  flex: 1;
  padding: ${props => props.theme.spacing.p2};
  background-color: ${props => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
  border-radius: ${props => props.theme.borderRadius};
`;
export const SignInButton = styled.TouchableOpacity`
  flex: 1;
  padding: ${props => props.theme.spacing.p2};
  background-color: ${props => props.theme.colors.secondary};
  justify-content: center;
  align-items: center;
  border-radius: ${props => props.theme.borderRadius};
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.light};
  font-size: ${props => props.theme.fontSize.h1};
  font-weight: bold;
  text-align: center;
`;

export const Subtitle = styled.Text`
  color: ${props => props.theme.colors.info};
  margin-top: 20px;
  font-size: ${props => props.theme.fontSize.h2};
  text-align: center;
`;

export const ButtonText = styled.Text`
  color: ${props => props.theme.colors.info};
  margin-top: 10px;
  font-size: ${props => props.theme.fontSize.h3};
  text-align: center;
  font-weight: bold;
  margin: 0;
`;

export default Authentication;
