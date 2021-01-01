import { NextPageContext } from 'next/types';

import { AuthInfo } from '../types/auth.types';
import Cookies from 'universal-cookie';

import FetchService from '../services/Fetch.service';
import NavService from '../services/Nav.service';

class TokenService {
  public saveToken(user: AuthInfo) {
    const cookies = new Cookies();
    cookies.set('auth', user, { path: '/' });
    return Promise.resolve();
  }

  public deleteToken() {
    const cookies = new Cookies();
    cookies.remove('auth', { path: '/' });
    return;
  }

  public getToken(): AuthInfo {
    const cookies = new Cookies();
    return cookies.get('auth');
  }

  public checkAuthToken(user: AuthInfo, ssr: boolean): Promise<any> {
    console.log(`checkAuthToken for user: ${user}, ssr ${ssr}`);
    return FetchService.isofetchAuthed(`/auth/validate`, { user }, 'POST', ssr);
  }

  /**
   * Runs on both client and server side in the getInitialProps static.
   * This decides whether the request is from client or server, which
   * is important as the URL's will be different due to the Docker
   * container network
   * @param ctx
   */
  public async authenticateTokenSsr(ctx: NextPageContext) {

    const ssr = ctx.req ? true : false;
    // @ts-ignore: ts(2532)
    const cookies = new Cookies(ssr ? ctx.req.headers.cookie : null);
    const cookie = cookies.get('auth');

    const response = await this.checkAuthToken(cookie, ssr);
    if (!response.success) {
      const navService = new NavService();
      this.deleteToken();
      navService.redirectUser('/?l=t', ctx);
    }
  }
}

export default TokenService;