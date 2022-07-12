import React, { useRef } from "react";
import { Form } from "@unform/mobile";
import * as Yup from "yup";
import styled from "styled-components/native";
import Input from "../components/Input";
import { SubmitHandler, FormHandles } from "@unform/core";

interface FormData {
  email: string;
  password: string;
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
      <Header>Sign in with your account</Header>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" keyboardType="email-address" label="Email:" />
        <Input secureTextEntry={true} name="password" label="Password:" />
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
  justify-content: center;
`;

export const Header = styled.Text`
  color: ${props => props.theme.colors.light};
  font-size: ${props => props.theme.fontSize.h1};
  font-weight: bold;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.p3};
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
  margin-top: 15px;
  border-radius: ${props => props.theme.borderRadius};
`;


export default SignIn;
