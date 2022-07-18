import { Form } from "@unform/mobile";
import React, { useContext, useRef } from "react";
import styled from "styled-components/native";
import Input from "../components/Input";
import uuid from "react-native-uuid";
import { SubmitHandler, FormHandles } from "@unform/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import { PostsContext } from "../contexts/PostsContext";

interface FormData {
  id: string;
  username: string;
  content: string;
}

const CreatePost = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const { user } = useAuth();
  const { fetchPosts } = useContext(PostsContext);

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    const { content } = data;
    if (content !== "") {
      const newPost = {
        id: uuid.v4(),
        username: user.username,
        content,
      };
      const response = await AsyncStorage.getItem("@blog:posts");
      const previousPosts = response ? JSON.parse(response) : [];
      const newData = [...previousPosts, newPost];
      await AsyncStorage.setItem("@blog:posts", JSON.stringify(newData));
      fetchPosts();
      navigation.goBack();
    }
  };

  return (
    <Container>
      <Title>Talk to your friends</Title>
      <FormContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="content" label={"Type your Post here"} />
          <Button
            mode="contained"
            onPress={() => formRef.current?.submitForm()}
          >
            <ButtonText>Publish</ButtonText>
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

export default CreatePost;
// export default withPosts(CreatePost);
