import {useToast} from '@chakra-ui/react';
import {useAuth} from '../services/Auth.context';
import Auth from '../components/Auth';
import {useRouter} from 'next/router';

const SignInPage = () => {
  const auth = useAuth();
  const toast = useToast();
  const router = useRouter();

  const signIn = ({ email, pass }: any) => {
    auth
      .signin(email, pass)
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

export default SignInPage;