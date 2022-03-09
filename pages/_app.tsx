import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CounterProvider } from "../utils/contexts/counter/CounterProvider";
import { UiProvider } from "../utils/contexts/ui/UiProvider";
// import { useUiContext } from "../utils/contexts/ui/UiHooks";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <CounterProvider>
          <UiProvider>
            <Component {...pageProps} />
          </UiProvider>
        </CounterProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
