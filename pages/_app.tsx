import type { AppProps } from 'next/app'
import * as React from 'react'

import { AuthProvider } from '../services/Auth.context'

import '../styles/index.css'
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class">
        <Component { ...pageProps } />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp