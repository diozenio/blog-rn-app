import { ThemeProvider } from "styled-components";
import { StatusBar } from "react-native";
import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts/AuthContext";
import theme from "./src/theme/theme";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}
