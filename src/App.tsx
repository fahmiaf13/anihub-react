import Router from "@/router";
import { HelmetProvider } from "react-helmet-async";
import { Loading } from "@/components/molecules";
import { ThemeProvider } from "@emotion/react";
import theme from "@/theme";
import { Suspense } from "react";
import { CollectionProvider } from "./context/CollectionContext";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <CollectionProvider>
            <Router />
          </CollectionProvider>
        </ThemeProvider>
      </HelmetProvider>
    </Suspense>
  );
}

export default App;
