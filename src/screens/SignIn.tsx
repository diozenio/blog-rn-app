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
        <Input name="email" type="email" label={"Digite seu email:"} />
        <Input name="password" type="password" />
        <Button title="Sign in" onPress={() => formRef.current?.submitForm()} />
      </Form>
    </Container>
  );
};

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #172026;
  padding: 20px;
  padding-top: 40px;
`;

export const Header = styled.Text`
  color: #5fcdd9;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
`;

export const Title = styled.Text`
  color: #5fcdd9;
  font-size: 20px;
  font-weight: bold;
  margin-top: 40px;
`;

export default SignIn;
