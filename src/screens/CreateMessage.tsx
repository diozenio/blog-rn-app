import { Form } from "@unform/mobile";
import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import Input from "../components/Input";
import uuid from "react-native-uuid";
import { SubmitHandler, FormHandles } from "@unform/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native-paper";

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
          <Button
            mode="contained"
            onPress={() => formRef.current?.submitForm()}
          >
            <ButtonText>Sign In</ButtonText>
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 40px;
`;

export const FormContainer = styled.View`
  width: 100%;
  margin-vertical: 40px;
`;

export const Title = styled(Text)`
  font-size: 22px;
  color: ${(props) => props.theme.colors.text};
`;

export const ButtonText = styled(Text)`
  color: ${(props) => props.theme.colors.text};
  font-size: 16px;
  font-weight: bold;
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

export default CreateMessage;
