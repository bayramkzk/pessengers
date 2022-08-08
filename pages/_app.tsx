import { CssBaseline, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import { fetcher } from "utils/fetcher";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const prefersLightMode = useMediaQuery("(prefers-color-scheme: light)");

  const darkTheme = createTheme({
    palette: {
      mode: prefersLightMode ? "light" : "dark",
      primary: {
        light: "#e57373",
        main: "#f44336",
        dark: "#d32f2f",
      },
    },
    typography: {
      fontFamily: "Fira Sans, sans-serif",
    },
  });

  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider theme={darkTheme}>
        <Head>
          <title>Pessengers</title>
        </Head>
        <CssBaseline enableColorScheme />
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
