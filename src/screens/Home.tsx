import React, { useEffect, useRef, useState } from "react";
import {
  IconButton as IB,
  Title,
  withTheme,
} from "react-native-paper";
import styled from "styled-components/native";
import PostCard from "../components/PostCard";
import { usePosts } from "../contexts/PostsContext";
import { PostData } from "../shared/interfaces/PostContext";
import { INavProps } from "../shared/interfaces/NavigationProps";
import { useAuth } from "../contexts/AuthContext";
import { Form } from "@unform/mobile";
import { FormHandles, SubmitHandler } from "@unform/core";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../components/CreatePost/Input";

interface FormData {
  id: string;
  username: string;
  content: string;
}

const Home: React.FC<INavProps> = ({ navigation, theme }) => {
  const formRef = useRef<FormHandles>(null);
  const { posts, fetchPosts } = usePosts();
  const { user } = useAuth();
  const [changed, setChanged] = useState(false);

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    const { content } = data;
    if (content !== "" && content !== undefined && content !== null) {
      const newPost = {
        id: uuid.v4(),
        username: user.username,
        content,
      };
      const response = await AsyncStorage.getItem("@blog:posts");
      const previousPosts = response ? JSON.parse(response) : [];
      const newData = [...previousPosts, newPost];
      await AsyncStorage.setItem("@blog:posts", JSON.stringify(newData));
      // await AsyncStorage.removeItem("@blog:posts");
      setChanged(!changed);
    }
  };

  const renderItem = (item: PostData) => {
    console.log("renderizou");

    return (
      <PostCard key={item.id} username={item.username} content={item.content} />
    );
  };

  useEffect(() => {
    fetchPosts();
  }, [changed]);

  return (
    <>
      <Container>
        <HeaderContainer>
          <MarginContainer />
          <Title>Recent posts</Title>
          <IconContainer>
            <IB
              icon="log-out"
              iconColor={theme.colors.text}
              size={20}
              onPress={() => console.log("Pressed")}
            />
          </IconContainer>
        </HeaderContainer>
        <PostsContainer>
          {posts && posts.length ? (
            posts.map((item: PostData) => {
              return renderItem(item);
            })
          ) : (
            <Title style={{ textAlign: "center" }}>
              No posts published yet
            </Title>
          )}
        </PostsContainer>
      </Container>
      <FooterContainer ref={formRef} onSubmit={handleSubmit}>
        <Input name="content" placeholder="What's happening?"></Input>
        <StyledButton>
          <IB
            icon="send"
            iconColor={theme.colors.text}
            onPress={() => formRef.current?.submitForm()}
          />
        </StyledButton>
      </FooterContainer>
    </>
  );
};

export const Container = styled.ScrollView`
  flex: 1;
`;

export const PostsContainer = styled.View`
  flex: 1;
  padding-horizontal: 10px;
  margin-bottom: 100px;
`;

export const HeaderContainer = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const FooterContainer = styled(Form)`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.accent};
`;

export const StyledButton = styled.View`
  margin: 0;
  margin-left: 25px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.roundness}px;
  height: 60px;
  width: 60px;
`;

export const MarginContainer = styled.View`
  flex: 1;
`;

export const IconContainer = styled.View`
  flex: 1;
  align-items: flex-end;
`;

export default withTheme(Home);
