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
  background-color: ${props => props.theme.colors.background};
`;

export const Title = styled.Text`
  font-size: ${props => props.theme.fontSize.h1};
  color: ${props => props.theme.colors.light};
  font-weight: bold;
`;


export default Home;
