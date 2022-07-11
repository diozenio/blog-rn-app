import React, { useRef } from "react";
import { Button } from "react-native";
import { Form } from "@unform/mobile";
import * as Yup from "yup";
import styled from "styled-components/native";
import Input from "../components/Input";
import { SubmitHandler, FormHandles } from "@unform/core";

interface FormData {
  name: string;
  email: string;
}

const SignIn = () => {
  const formRef = useRef<FormHandles>(null);
  async function handleSubmit(data : SubmitHandler<FormData>) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed
      console.log(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        // Validation failed
        console.log(err);
      }
    }
  }
  return (
    <Container>
      <Header>Blog spots</Header>
      <Title>Sign in with your account</Title>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" keyboardType="email-address" label="Email:" />
        <Input name="password" label="Password:" keyboardType="visible-password" />
        <Submit onPress={() => formRef.current?.submitForm()}>
        <ButtonText>Sign In</ButtonText>
        </Submit>
      </Form>
    </Container>
  );
};

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.p2};
  padding-top: ${props => props.theme.spacing.p3};
`;

export const Header = styled.Text`
  color: ${props => props.theme.colors.light};
  font-size: ${props => props.theme.fontSize.x2};
  font-weight: bold;
  text-align: center;
`;

export const ButtonText = styled.Text`
  color: ${props => props.theme.colors.light};
  font-size: ${props => props.theme.fontSize.h3};
  font-weight: bold;
  text-align: center;
`;

export const Submit = styled.TouchableOpacity`
  width: 100%;
  padding: ${props => props.theme.spacing.p2};
  background-color: ${props => props.theme.colors.submit};
  justify-content: center;
  align-items: center;
  border-radius: ${props => props.theme.borderRadius};
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.info};
  font-size: ${props => props.theme.fontSize.h2};
  font-weight: bold;
  margin-top: 40px;
`;

export default SignIn;
