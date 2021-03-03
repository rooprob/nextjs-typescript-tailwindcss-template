import { GetStaticPropsContext, NextPageContext } from 'next/types';

import { AuthInfo } from '../types/auth.types';

class LocalTokenService {
  public saveToken(user: AuthInfo) {
    if (user !== undefined && user.email != undefined) {
      localStorage.setItem('auth', user.email);
    }
  }

  public deleteToken() {
    localStorage.removeItem('auth');
  }

  public getToken(): string | null {
    return localStorage.getItem('auth');
  }
}

export default LocalTokenService;