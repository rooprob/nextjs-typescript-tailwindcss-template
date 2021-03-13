import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR
} from 'next-firebase-auth'
import IndexHeader from '../components/IndexHeader';

import {Box, Flex, Heading, Text, Button} from '@chakra-ui/react';
import NextLink from 'next/link';

export const Container = (props: any) => <Box width="full" maxWidth="1280px" mx="auto" px={6} {...props} />;
export const SignUpButton = (props: any) => <NextLink href="/signup" passHref>
        <Button size="lg" as="a" colorScheme="teal">
          Sign up to Get Started
        </Button>
      </NextLink>
export const DealsButton = (props: any) => <NextLink href="/deals" passHref>
        <Button size="lg" as="a" colorScheme="teal">
          Deals
        </Button>
      </NextLink>

const HomePage = () => {
  const AuthUser = useAuthUser()

  return (
    <Box h="100vh">
      <IndexHeader email={AuthUser.email} onSignOut={AuthUser.signOut} />
      <Box as="section" pt={40} pb={24}>
        <Container>
          <Box maxW="xl" mx="auto" textAlign="center">
            <Heading as="h1" size="xl" fontWeight="black">
              Find the cheapest drinks deals happening right now.
            </Heading>

            <Text opacity="0.7" fontSize="lg" mt="6">
              daydrink helps you find the best drink deals and happy hours in
              your area. View the cheapest drinks for the day and filter down to
              exactly what you're searching for.
            </Text>

            <Box mt="6">
              { !AuthUser.id ? (<SignUpButton /> ) : ( <DealsButton /> ) }
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser()(HomePage);