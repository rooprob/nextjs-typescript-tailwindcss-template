import {useToast} from '@chakra-ui/react';
import { withAuthUser, AuthAction } from 'next-firebase-auth'

import Auth from '../components/Auth';
import {useRouter} from 'next/router';

import firebase from 'firebase/app'

const AuthPage = () => {
  const toast = useToast();
  const router = useRouter();

  const signIn = ({ email, pass }: any) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        router.push("/deals");
      })
      .catch((error: any) => {
        toast({
          title: "An error occurred.",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return <Auth type="Sign In" onSubmit={signIn} />;
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(AuthPage);