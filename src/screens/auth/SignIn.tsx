import React, { useRef } from "react";
import { Form } from "@unform/mobile";
import * as Yup from "yup";
import styled from "styled-components/native";
import Input from "../../components/Input";
import ButtonForm from "../../components/ButtonForm";
import { SubmitHandler, FormHandles } from "@unform/core";
import { useAuth } from "../../contexts/AuthContext";
import { Caption, Headline, Text, Title } from "react-native-paper";

interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const { signIn } = useAuth();
  const formRef = useRef<FormHandles>(null);
  async function handleSubmit(data: SubmitHandler<FormData>) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed
      signIn(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        // Validation failed
        console.log(err);
      }
    }
  }
  return (
    <Container>
      <MarginContainer />
      <Welcome>Welcome back</Welcome>
      <Header>Sign in with your account:</Header>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="email"
          keyboardType="email-address"
          label="Email:"
          placeholder="Example@example.com"
        />
        <Input
          secureTextEntry={true}
          name="password"
          placeholder="Password"
          label="Password:"
        />
        <ButtonForm
          buttonName={"Sign In"}
          onPress={() => formRef.current?.submitForm()}
        ></ButtonForm>
      </Form>
      <MarginContainer />
    </Container>
  );
};

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 30px;
  padding-top: 40px;
`;

export const MarginContainer = styled.View`
  flex: 1;
`;

export const Header = styled(Text)`
  color: ${(props) => props.theme.colors.onSurface};
  font-size: 22px;
  text-align: center;
  margin-bottom: 30px;
`;

export const Welcome = styled(Title)`
  color: ${(props) => props.theme.colors.text};
  font-size: 35px;
  line-height: 40px;
  text-align: center;
`;

export const ButtonText = styled(Text)`
  color: ${(props) => props.theme.colors.text};
  font-size: 18px;
  text-align: center;
`;

export const Submit = styled.TouchableOpacity`
  width: 100%;
  padding: 30px;
  background-color: ${(props) => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  border-radius: ${(props) => props.theme.roundness}px;
`;

export default SignIn;
