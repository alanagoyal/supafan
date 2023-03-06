import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FrigadeProvider } from "@frigade/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FrigadeProvider publicApiKey={process.env.FRIGADE_API_KEY!}>
      <Component {...pageProps} />
    </FrigadeProvider>
  );
}
