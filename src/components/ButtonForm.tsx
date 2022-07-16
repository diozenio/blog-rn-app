import React from "react";
import styled from "styled-components/native";
import { Button as B } from "react-native-paper";
import { IButtonForm } from "../shared/interfaces/ButtonForm";

const ButtonForm: React.FC<IButtonForm> = ({ children, ...rest }) => {
  return <Button {...rest} mode="outlined">{children}</Button>;
};

export const Button = styled(B)`
  background-color: ${(props) => props.theme.colors.surface};
  padding-vertical: 5px;
  margin-top: 15px;
`;

export default ButtonForm;
