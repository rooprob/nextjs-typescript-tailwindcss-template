import { ChakraProvider } from "@chakra-ui/react";

import { DefaultSeo } from "next-seo";
import seo from "../seo.config";
import { SearchProvider } from "../services/Search.context";

import type { AppProps } from "next/app";
import Head from "next/head";

import * as React from "react";

import initAuth from "../utils/initAuth";

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SearchProvider>
        <DefaultSeo {...seo} />
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta title="Daydrink | Find the best drink deals and happy hours in your area." />
          <link rel="icon" sizes="96x96" href="/favicons/favicon.ico" />
          <meta name="theme-color" content="#319795"></meta>
        </Head>
        <Component {...pageProps} />
      </SearchProvider>
    </ChakraProvider>
  );
}

export default MyApp;
