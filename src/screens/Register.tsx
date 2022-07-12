import React, { useRef } from "react";
import { Form } from "@unform/mobile";
import * as Yup from "yup";
import styled from "styled-components/native";
import Input from "../components/Input";
import { SubmitHandler, FormHandles } from "@unform/core";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  async function createNewUser(data: FormData) {
    try {
      const newUser = {
        id: uuid.v4(),
        username: data.username,
        email: data.email,
        password: data.password,
      };
      const jsonValue = JSON.stringify(newUser);
      await AsyncStorage.setItem("@blog:users", jsonValue);
      console.log("Created new user");
      
      navigation.navigate("Home");
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

  async function handleSubmit(data: SubmitHandler<FormData>) {
    try {
      const schema = Yup.object().shape({
        username: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed
      createNewUser(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        // Validation failed
        console.log(err);
      }
    }
  }
  return (
    <Container>
      <Header>Create your account</Header>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="username" label="Username:" />
        <Input name="email" keyboardType="email-address" label="Email:" />
        <Input name="password" secureTextEntry={true} label="Password:" />
        <Submit onPress={() => formRef.current?.submitForm()}>
          <ButtonText>Create account</ButtonText>
        </Submit>
      </Form>
    </Container>
  );
};

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.p2};
  padding-top: ${(props) => props.theme.spacing.p3};
  justify-content: center;
`;

export const Header = styled.Text`
  color: ${(props) => props.theme.colors.light};
  font-size: ${(props) => props.theme.fontSize.h1};
  font-weight: bold;
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.p3};
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.light};
  font-size: ${(props) => props.theme.fontSize.h3};
  font-weight: bold;
  text-align: center;
`;

export const Submit = styled.TouchableOpacity`
  width: 100%;
  padding: ${(props) => props.theme.spacing.p2};
  background-color: ${(props) => props.theme.colors.submit};
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  border-radius: ${(props) => props.theme.borderRadius};
`;

export default Register;
