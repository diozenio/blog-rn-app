import React from "react";
import styled from "styled-components/native";

const Home = () => {
  return (
    <Container>
      <Title>Home screen</Title>
    </Container>
  );
};

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #333;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`;


export default Home;
