import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../utils/auth/initFirebase'
import { mapUserData } from '../utils/auth/mapUserData'
import TokenService from '../services/Token.service'

// Init the Firebase app.
initFirebase()

const firebaseAuthConfig: firebaseui.auth.Config = {
  signInFlow: "popup",
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  signInSuccessUrl: "/",
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: ({ user }: any, redirectUrl: string): boolean => {
        mapUserData(user).then((userData) => {
            const tokenService = new TokenService();
            tokenService.saveToken(userData);
        });
        return true;
    },
    signInFailure: (error: firebaseui.auth.AuthUIError): Promise<void> => {
      console.log("signInFailure", error);
      return new Promise((resolve) => resolve());
    },
  },
};

const FirebaseAuth = () => {
  return (
    <div>
      <StyledFirebaseAuth
        uiConfig={firebaseAuthConfig}
        firebaseAuth={firebase.auth()}
      />
    </div>
  )
}

export default FirebaseAuth