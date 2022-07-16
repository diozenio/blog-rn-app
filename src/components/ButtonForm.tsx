import React from "react";
import { Button, withTheme } from "react-native-paper";

const ButtonForm: React.FC = ({ children, ...rest }) => {
  return (
    <Button
      mode="outlined"
      {...rest}
      style={{ backgroundColor: "#0097f7", paddingVertical: 5, marginTop: 15}}
    >
      {children}
    </Button>
  );
};

export default withTheme(ButtonForm);
