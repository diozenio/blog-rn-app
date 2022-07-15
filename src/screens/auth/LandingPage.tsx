import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { withTheme } from "react-native-paper";
import { Text } from "react-native-paper";

const LandingPage = (props: any) => {
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
          <RegisterButton onPress={() => navigation.navigate("SignUp")}>
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
  background-color: ${(props) => props.theme.colors.primary};
  width: 80%;
  flex-direction: row;
`;

export const RegisterButton = styled.TouchableOpacity`
  padding: 30px;
  flex: 1;
  border-radius: ${(props) => props.theme.roundness}px;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.primary};
  align-items: center;
`;
export const SignInButton = styled.TouchableOpacity`
  border-radius: ${(props) => props.theme.roundness}px;
  background-color: ${(props) => props.theme.colors.onSurface};
  padding: 30px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled(Text)`
  color: ${(props) => props.theme.colors.text};
  font-weight: 100;
  font-size: 21px;
  text-align: center;
`;

export const Subtitle = styled(Text)`
  font-size: 18px;
  color: ${(props) => props.theme.colors.primary};
  margin-top: 20px;
  text-align: center;
`;

export const ButtonText = styled(Text)`
  font-size: 18px;
  color: ${(props) => props.theme.colors.text};
  margin-top: 10px;
  text-align: center;
  margin: 0;
`;

export default withTheme(LandingPage);
