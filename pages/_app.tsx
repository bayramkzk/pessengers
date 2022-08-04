import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { fetcher } from "utils/fetcher";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
