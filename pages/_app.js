import TopBar from "@/components/TopBar";
import { NextUIProvider } from "@nextui-org/react";
import { GlobalContextProvider } from "../context/globalContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <GlobalContextProvider>
        <TopBar />
        <Component {...pageProps} />
      </GlobalContextProvider>
    </NextUIProvider>
  );
}

export default MyApp;
