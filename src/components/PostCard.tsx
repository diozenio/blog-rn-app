import { View, Text } from "react-native";
import React from "react";
import { Caption as C, Divider as D, Title } from "react-native-paper";
import styled from "styled-components/native";

interface PostCardData {
  username: string;
  content: string;
}

const PostCard = ({ username, content }: PostCardData) => {
  return (
    <Container>
      <Title>{username}</Title>
      <Caption>{content}</Caption>
    </Container>
  );
};

export const Container = styled.View`
  background-color: ${(props) => props.theme.colors.accent};
  border-radius: ${(props) => props.theme.roundness}px;
  margin-bottom: 10px;
  padding: 10px;
`;

export const Caption = styled(C)`
  font-size: 15px;
`;

export default PostCard;
