import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import queryString from 'query-string';
import firebase from 'firebase/app';
import 'firebase/auth';

import { AuthInfo, AuthStateContextType } from "../types/auth.types";
import { mapUserAuthInfo } from '../utils/auth/mapUserAuthInfo';
import TokenService from './Token.service'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const AuthStateContext = createContext<AuthStateContextType>({
  userId: undefined,
  user: undefined,
  signin: (email, password) => console.warn('void'),
  signup: (email, password) =>  console.warn('void'),
  signout: () => console.warn('void'),
  sendPasswordResetEmail: (email) => console.warn('void'),
  confirmPasswordReset: (password, code) => console.warn('void'),
});
export const useAuth: any = () => useContext(AuthStateContext);

type AuthProviderProps = {};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuthProvider();
  return (
    <AuthStateContext.Provider value={auth}>
      {children}
    </AuthStateContext.Provider>
  );
};

const useAuthProvider = () => {
  const [user, setUser] = useState<AuthInfo>();
  const tokenService = new TokenService();

  const signin = (email: string, password: string): Promise<void | AuthInfo> => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        if (response.user === null) {
          tokenService.deleteToken();
          setUser(undefined);
          return;
        }
        mapUserAuthInfo(response.user).then((authInfo) => {
          tokenService.saveToken(authInfo);
          setUser(authInfo);
          return authInfo;
        });
      });
  };

  const signup = (email: string, password: string): Promise<void | AuthInfo> => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        if (response.user === null) {
          tokenService.deleteToken();
          setUser(undefined);
          return;
        }
        mapUserAuthInfo(response.user).then((authInfo) => {
          tokenService.saveToken(authInfo);
          setUser(authInfo);
          return authInfo;
        });
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        tokenService.deleteToken();
        setUser(undefined);
      });
  };

  const sendPasswordResetEmail = (email: string): Promise<boolean> => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (password: string, code: string): Promise<boolean> => {
    const resetCode: any = code || getFromQueryString("oobCode");
    if (!resetCode) {
      return Promise.resolve(false);
    }
    return firebase
      .auth()
      .confirmPasswordReset(resetCode, password)
      .then(() => {
        return true;
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        mapUserAuthInfo(user).then((authInfo) => {
          tokenService.saveToken(authInfo);
          setUser(authInfo);
        });
      } else {
        tokenService.deleteToken();
      	setUser(undefined);
      }
    });

    return () => unsubscribe();
  }, []);

  console.log(`I'm in Auth, user is`);
  console.log(user);

  return {
    userId: user && user.id,
    user: user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};

const getFromQueryString = (key: string) => {
  return queryString.parse(window.location.search)[key];
};	