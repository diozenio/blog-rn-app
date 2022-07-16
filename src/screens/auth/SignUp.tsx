import React, { useRef } from "react";
import { Form } from "@unform/mobile";
import * as Yup from "yup";
import styled from "styled-components/native";
import Input from "../../components/Input";
import { SubmitHandler, FormHandles } from "@unform/core";
import { useAuth } from "../../contexts/AuthContext";
import { Headline } from "react-native-paper";
import ButtonForm from "../../components/ButtonForm";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const SignUp = (props: any) => {
  const { signUp } = useAuth();
  const formRef = useRef<FormHandles>(null);

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
      signUp(data);
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
        <Input
          name="username"
          label="Username:"
          placeholder="Enter your username"
        />
        <Input
          name="email"
          keyboardType="email-address"
          label="Email:"
          placeholder="Example@example.com"
        />
        <Input
          name="password"
          secureTextEntry={true}
          label="Password:"
          placeholder="Password"
        />
        <ButtonForm onPress={() => formRef.current?.submitForm()}>
          <ButtonText>Create account</ButtonText>
        </ButtonForm>
      </Form>
    </Container>
  );
};

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 30px;
  padding-top: 40px;
  justify-content: center;
`;

export const Header = styled(Headline)`
  color: ${(props) => props.theme.colors.text};
  font-size: 22px;
  text-align: center;
  margin-bottom: 40px;
`;

export const ButtonText = styled.Text`
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

export default SignUp;
