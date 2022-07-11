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
  background-color: #f7f8ff;
  padding: 5px;
`;

export const Imagem = styled.Image`
  width: 70%;
  height: 70%;
`;

export const ImageContainer = styled.View`
  flex: 1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
  background-color: #cd8efa;
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
  background-color: #ffffff;
  border-radius: 15px;
`;

export const RegisterButton = styled.TouchableOpacity`
  flex: 1;
  padding: 25px;
  background-color: #e6eaf7;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;
export const SignInButton = styled.TouchableOpacity`
  flex: 1;
  padding: 25px;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
`;

export const Title = styled.Text`
  color: #333;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

export const Subtitle = styled.Text`
  color: #999;
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
`;

export const ButtonText = styled.Text`
  color: #555;
  margin-top: 10px;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  margin: 0;
`;

export default Authentication;
