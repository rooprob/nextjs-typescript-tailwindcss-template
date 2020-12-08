import '../styles/index.css'
import { ThemeProvider } from 'next-themes';
import { useUser } from '../utils/auth/useUser';

import type { AppProps /*, AppContext */ } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const { user, logout } = useUser();
  return (
    <ThemeProvider attribute="class">
      <Component user={user} logout={logout} { ...pageProps } />
    </ThemeProvider>
  );
}

export default MyApp