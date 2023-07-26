import Router from "@/router";
import { HelmetProvider } from "react-helmet-async";
import { Loading } from "@/components/molecules";
import { ThemeProvider } from "@emotion/react";
import theme from "@/theme";
import { Suspense } from "react";
import { CartProvider } from "@/context/CartContext";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <CartProvider>
            <Router />
          </CartProvider>
        </ThemeProvider>
      </HelmetProvider>
    </Suspense>
  );
}

export default App;
