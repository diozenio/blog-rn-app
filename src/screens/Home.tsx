import { useNavigation } from "@react-navigation/native";
import React, {
  useContext,
  useMemo,
} from "react";
import {
  Headline,
  IconButton as IB,
  Title,
  withTheme,
} from "react-native-paper";
import styled from "styled-components/native";
import PostCard from "../components/PostCard";
import { PostsContext } from "../contexts/PostsContext";

interface Post {
  id: string;
  username: string;
  content: string;
}

const Home = (props: any) => {
  const navigation = useNavigation();
  const { posts, fetchPosts } = useContext(PostsContext);

  const renderItem = (item: Post) => {
    return (
      <PostCard
        key={item.id}
        username={item.username}
        content={item.content}
      />
    );
  };

  useMemo(() => {
    fetchPosts();
  }, [posts]);

  return (
    <SafeArea>
      <Container>
        <Headline>Home page</Headline>
        <Title style={{ marginTop: 10 }}>Recent posts:</Title>
        {posts.map((item: Post) => {
          return renderItem(item);
        })}
      </Container>
      <IconButton>
        <IB
          icon="message-square"
          color={props.theme.colors.text}
          size={30}
          onPress={() => navigation.navigate("CreatePost")}
        />
      </IconButton>
    </SafeArea>
  );
};

export const SafeArea = styled.View`
  flex: 1;  
  margin: 0;
  padding 0;
`;

export const Container = styled.ScrollView`
  flex: 1;
  padding: 30px;
  padding-top: 40px;
  z-index: 1;
`;

export const IconButton = styled.View`
  background-color: ${(props) => props.theme.colors.surface};
  height: 60px;
  width: 60px;
  z-index: 10;
  border-radius: ${(props) => props.theme.roundness}px;
  position: absolute;
  bottom: 70px;
  right: 10px;
  justify-content: center;
  align-items: center;
`;

export default withTheme(Home);
