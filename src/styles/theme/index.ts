import { Theme } from "react-native-paper/src/types";
import { configureFonts, DefaultTheme } from "react-native-paper";
import fonts from "./fonts";

const theme: Theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    background: "#151521",
    text: "#fff",
    primary: "#2b2b40",
    surface: "#009ef7",
    accent: "#1e1e2d",
    onSurface: "#fffaaa",
    backdrop: "#1b1b29",
    placeholder: "#565674",
  },
  dark: true,
  fonts: configureFonts(fonts),
};

export default theme;
