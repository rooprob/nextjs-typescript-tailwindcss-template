import {
  useAuthUser,
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import {Box, Flex, Heading, Text, Button} from '@chakra-ui/react';
import IndexHeader from '../components/IndexHeader';
import {useRouter} from 'next/router';

export const Container = (props: any) => <Box width="full" maxWidth="1280px" mx="auto" px={6} {...props} />;

const VerifyPage = () => {
  const AuthUser = useAuthUser()
  const router = useRouter();

  // https://firebase.google.com/docs/reference/rest/auth#section-send-email-verification

  const verifyEmail = ({ email }: any) => {
    console.log("not implemented");
  };

  return (
    <Box h="100vh">
      <IndexHeader email={AuthUser.email} onSignOut={AuthUser.signOut} />
      <Box as="section" pt={40} pb={24}>
        <Container>
          <Box maxW="xl" mx="auto" textAlign="center">
            <Heading as="h1" size="xl" fontWeight="black">
              Verify your login
            </Heading>

            <Text opacity="0.7" fontSize="lg" mt="6">
              Your account is nearly setup; We just need to you verify your
              email. Please check your account and click the link.
            </Text>

            <Box mt="6">
              <Button onClick={verifyEmail} variant="ghost">
                {"Re-send Email"}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};


export const getServerSideProps = withAuthUserTokenSSR({
    whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async (ctx: any) => {
  // Optionally get any other props
  const { AuthUser } = ctx;

  // If the user is authenticated but has no email, let's assume that's a
  // big crime for the app, so display a 404 page.
  if (!AuthUser.email) {
    return {
      notFound: true,
    }
  }
  if (!AuthUser.emailVerified) {
    console.log("Email not verified");
  }
  return {
    props: {
      email: AuthUser.email,
      emailVerified: AuthUser.emailVerified,
    },
  };
});


export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(VerifyPage);