import React from "react";
import styled from "styled-components/native";
import { Button as B, Title } from "react-native-paper";
import { IButtonForm } from "../shared/interfaces/ButtonForm";

const ButtonForm: React.FC<IButtonForm> = ({ buttonName, ...rest }) => {
  return (
    <Button uppercase={false} {...rest} mode="text">
      <ButtonText>{buttonName}</ButtonText>
    </Button>
  );
};

export const Button = styled(B)`
  background-color: ${(props) => props.theme.colors.surface};
  padding-vertical: 5px;
  margin-top: 15px;
`;

export const ButtonText = styled(Title)`
  color: ${(props) => props.theme.colors.text};
  font-size: 18px;
  text-align: center;
`;

export default ButtonForm;
