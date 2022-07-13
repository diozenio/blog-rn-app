import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./src/contexts/AuthContext";
import theme from "./src/theme/theme";

export default function App() {
  return (
    <AuthProvider>
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
    </AuthProvider>
  );
}
