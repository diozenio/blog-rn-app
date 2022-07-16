import { View, Text } from "react-native";
import React from "react";
import { Paragraph, Title, withTheme } from "react-native-paper";

const PostCard = ({username, content} : any) => {
  return (
    <View style={{backgroundColor: '#333', marginBottom: 10}}>
      <Title>{username}</Title>
      <Paragraph>{content}</Paragraph>
    </View>
  );
};

export default PostCard;
