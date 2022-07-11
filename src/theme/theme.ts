export type ThemeType = typeof theme; // This is the type definition for my theme object.
import { Dimensions, Platform, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 320;

function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export const theme = {
  // BORDER RADIUS
  borderRadius: "7.6px",
  spacing: {
    p1: "15px",
    p2: "20px",
    p3: "30px",
  },

  fontSize: {
    // HEADERS
    h1: `${normalize(22.75)}px`,
    h2: `${normalize(19.5)}px`,
    // NORMAL FONT SIZES
    h3: `${normalize(17.55)}px`,
    x2: `${normalize(22.75 * 2)}px`,
    x3: `${normalize(22.75 * 3)}px`,
    x4: `${normalize(22.75 * 4)}px`,
  },
  colors: {
    primary: "#1E1E2D",
    secondary: "#2B2B40",
    background: "#151521",
    submit: "#009EF7",
    info: "#92929F",
    warning: "#dc3545",
    light: "#FFFFFF",
  },
};

export default theme;
