import { ChakraProvider } from "@chakra-ui/react"

import {DefaultSeo} from 'next-seo';
import seo from '../seo.config';
import {AuthProvider} from '../services/Auth.context';
import {SearchProvider} from '../services/Search.context';

import type { AppProps } from 'next/app'
import * as React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <SearchProvider>
          <DefaultSeo {...seo} />
          <Component {...pageProps} />
        </SearchProvider>
      </ChakraProvider>
    </AuthProvider>
  );
};

export default MyApp;