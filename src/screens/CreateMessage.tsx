import { Form } from "@unform/mobile";
import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import Input from "../components/Input";
import uuid from "react-native-uuid";
import { SubmitHandler, FormHandles } from "@unform/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

interface FormData {
  content: string;
}

const CreateMessage = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  async function handleSubmit(data: SubmitHandler<FormData>) {
    const { content } = data;
    if (content !== "") {
      const newMessage = {
        id: uuid.v4(),
        content,
      };
      var response = await AsyncStorage.getItem("@blog:messages");
      const previousMessages = response ? JSON.parse(response) : [];
      const newData = [...previousMessages, newMessage];
      await AsyncStorage.setItem("@blog:messages", JSON.stringify(newData));
      navigation.goBack();
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

export default CreateMessage;
