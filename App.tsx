import { ThemeProvider } from "styled-components";
import Routes from "./src/routes/routes";
import theme from "./src/theme/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
