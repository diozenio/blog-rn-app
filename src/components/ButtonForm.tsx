import React from "react";
import styled from 'styled-components/native';
import { Button as B } from "react-native-paper";

const ButtonForm: React.FC = ({ children, ...rest }) => {
  return (
    <Button
      mode="outlined"
      {...rest}
    >
      {children}
    </Button>
  );
};


export const Button = styled(B)`
  background-color: ${(props) => props.theme.colors.surface};
  padding-vertical: 5px;
  margin-top: 15px;
`;


export default ButtonForm;
