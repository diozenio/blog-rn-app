import { ThemeProvider } from "styled-components";
import { StatusBar } from "react-native";
import { AuthProvider } from "./src/contexts/AuthContext";
import theme from "./src/theme/theme";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
    </AuthProvider>
  );
}
