import Router from "@/router";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@emotion/react";
import theme from "@/theme";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
