import { Form } from "@unform/mobile";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import Input from "../components/Input";
import * as Yup from "yup";
import uuid from "react-native-uuid";
import { SubmitHandler, FormHandles } from "@unform/core";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FormData {
  content: string;
}

const Home = () => {
  const [messages, setMessages] = useState<FormData>([]);
  const formRef = useRef<FormHandles>(null);

  async function handleCreateMessage(data: FormData) {
    try {
      const newMessage = {
        id: uuid.v4(),
        content: data.content,
      };
      const jsonValue = JSON.stringify(newMessage);
      await AsyncStorage.setItem("@blog:messages", jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

  async function handleFetchCards() {
    const response = await AsyncStorage.getItem("@blog:messages");
    const previusData = response ? JSON.parse(response) : [];
    const data = [...previusData, newMessage];
    console.log(data);
    
    setMessages(data);
    
  }

  useEffect(() => {
    handleFetchCards();
  }, []);

  async function handleSubmit(data: SubmitHandler<FormData>) {
    try {
      const schema = Yup.object().shape({
        content: Yup.string().required(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed
      handleCreateMessage(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        // Validation failed
        console.log(err);
      }
    }
  }

  return (
    <Container>
      <Title>Talk to your friends</Title>
      <FormContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="content" label={"Type your message here"} />
          <Submit onPress={() => formRef.current?.submitForm()}>
            <ButtonText>Send it</ButtonText>
          </Submit>
        </Form>
      </FormContainer>
      <FlatListTitle>What is happening now?</FlatListTitle>
    </Container>
  );
};

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: ${(props) => props.theme.spacing.p3};
  background-color: ${(props) => props.theme.colors.background};
`;

export const FormContainer = styled.View`
  width: 100%;
  margin-vertical: ${(props) => props.theme.spacing.p3};
`;

export const Title = styled.Text`
  font-size: ${(props) => props.theme.fontSize.h1};
  color: ${(props) => props.theme.colors.light};
  font-weight: bold;
`;
export const FlatListTitle = styled.Text`
  font-size: ${(props) => props.theme.fontSize.h1};
  color: ${(props) => props.theme.colors.info};
  font-weight: bold;
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

export default Home;
