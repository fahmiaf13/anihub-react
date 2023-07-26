import Router from "@/router";
import { HelmetProvider } from "react-helmet-async";
import { Loading } from "@/components/molecules";
import { ThemeProvider } from "@emotion/react";
import theme from "@/theme";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </HelmetProvider>
    </Suspense>
  );
}

export default App;
