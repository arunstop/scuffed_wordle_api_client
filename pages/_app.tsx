import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CounterProvider } from "../utils/contexts/counter/CounterProvider";
import { UiProvider } from "../utils/contexts/ui/UiProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CounterProvider>
        <UiProvider>
          <Component {...pageProps} />
        </UiProvider>
      </CounterProvider>
    </>
  );
}

export default MyApp;
