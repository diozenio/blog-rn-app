import { ThemeProvider } from "styled-components";
import { StatusBar } from "react-native";
import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts/AuthContext";
import merge from "deepmerge";
import {
  Provider as PaperProvider,
  ActivityIndicator,
} from "react-native-paper";
import FeatherIcon from "react-native-vector-icons/Feather";
import theme from "./src/styles/theme/";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { useFonts } from "expo-font";

const combinedTheme = merge(NavigationDefaultTheme, theme);

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
          <PaperProvider
            settings={{ icon: (props) => <FeatherIcon {...props} /> }}
            theme={combinedTheme}
          >
            <NavigationContainer theme={combinedTheme}>
              <Routes />
            </NavigationContainer>
          </PaperProvider>
        </ThemeProvider>
      </AuthProvider>
    );
  }
}
