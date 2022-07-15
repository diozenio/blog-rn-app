import React from "react";
import { Button, withTheme } from "react-native-paper";

// import { Container } from './styles';

const ButtonForm: React.FC = ({ children, ...rest }) => {
  return (
    <Button
      mode="contained"
      {...rest}
      style={{ backgroundColor: "#0097f7", paddingVertical: 5 }}
    >
      {children}
    </Button>
  );
};

export default withTheme(ButtonForm);
