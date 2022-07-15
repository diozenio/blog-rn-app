import { ThemeProvider } from "styled-components";
import { StatusBar } from "react-native";
import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts/AuthContext";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
  });

  if (!loaded) {
    return <ActivityIndicator animating={true} color={"blue"} />;
  } else {
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
}
