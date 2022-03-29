import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CounterProvider } from "../utils/contexts/counter/CounterProvider";
import { UiProvider } from "../utils/contexts/ui/UiProvider";
// import { useUiContext } from "../utils/contexts/ui/UiHooks";
import { ThemeProvider } from "next-themes";
import GameProvider from "../utils/contexts/game/GameProvider";
import { ApiProvider } from "../utils/contexts/api/ApiProvider";
// import { useEffect } from "react";
// import { NextRouter, useRouter } from "next/router";
// import MainComponent from "../components/MainComponent";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <ApiProvider>
          <CounterProvider>
            <UiProvider>
              <GameProvider>
                <Component {...pageProps} />
              </GameProvider>
            </UiProvider>
          </CounterProvider>
        </ApiProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
