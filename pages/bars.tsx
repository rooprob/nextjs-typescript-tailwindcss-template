import {Text, Flex, Spinner} from '@chakra-ui/react';
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth'

//import {useBars} from '../graphql/hooks';
import {useSearch} from '../services/Search.context';
import { useAlcoholFilter } from '../services/Alcohol.context';
// import {withApollo} from '../graphql/apollo';
import App from '../components/App';
import BarCard from '../components/BarCard';
import EmptySearch from '../components/EmptySearch';
import { BarCardProps, LocationCardProps } from '../types/global.types';
import getAbsoluteURL from '../utils/getAbsoluteURL'

interface Bars {
    locations: BarCardProps[],
}

const BarsPage = ({ emailVerified, favoriteColor }: any) => {
    const AuthUser = useAuthUser();

    const { search } = useSearch();
    const { dayOfWeek, alcoholTypeFilter } = useAlcoholFilter();
    // const {data, loading} = useBars(dayOfWeek);
    var startDate = new Date();
    startDate.setDate(startDate.getDate() - 2);
    var endDate = new Date();
    endDate.setDate(endDate.getDate() + 45);

    const data: Bars = {
        locations: [
            { name: "foobar", address: "nowhere", deals:[], imageUrl: "" },
        ]
    };
    const loading = false;

    const matchesSearch = (location : BarCardProps) => location.name.toLowerCase().includes(search.toLowerCase());
    const allLocations = data ? data.locations : [];
    const filteredLocations = allLocations.filter(matchesSearch);

    return (
        <App email={AuthUser.email} signOut={AuthUser.signOut} width="full" maxWidth="1280px" mx="auto" px={6} py={6}>
            <Text mb={2} fontWeight="bold" fontSize="sm">
                {'Open Now'}
            </Text>
            {loading ? (
                <Flex pt={24} align="center" justify="center">
                    <Spinner size="xl" label="Loading Bars" />
                </Flex>
            ) : (
                <>
                    {filteredLocations.length ? (
                        filteredLocations.map((bar) => <BarCard key={bar.name} {...bar} />)
                    ) : (
                        <EmptySearch />
                    )}
                    <Flex justify="flex-end" as="i" color="gray.500">
                        {`Showing ${filteredLocations.length} out of ${allLocations.length} deals in Des Moines`}
                    </Flex>
                </>
            )}
        </App>
    );
};

export const getServerSideProps = withAuthUserTokenSSR({
    whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async (ctx: any) => {
  // Optionally get any other props
  const { AuthUser } = ctx;

  // If the user is not authenticated at all, do a simple custom redirect
  // to login page (equivalent to REDIRECT_TO_LOGIN parameter of withAuthUserSSR).
  if (!AuthUser || !AuthUser.id) {
    console.log("Simply not logged in...");
    console.log(AuthUser);

    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }
  // If the user is authenticated but has no email, let's assume that's a
  // big crime for the app, so display a 404 page.
  if (!AuthUser.email) {
    return {
      notFound: true,
    }
  }
  // If the user is authenticated, has an email, but the email is not verified,
  // we perform a custom redirect to the login page and inject query parameters
  // that the login page must handle.
  if (!AuthUser.emailVerified) {
    return {
      redirect: {
        destination: `/auth?verifyEmail=true&thenGoToPage=${encodeURIComponent(
          ctx.resolvedUrl
        )}`,
        permanent: false,
      },
    }
  }
  // And finally if everything is OK, we return a props object as usual.

  const token = await AuthUser.getIdToken();
  const endpoint = getAbsoluteURL("/api/example/color", ctx.req);
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: token || "unauthenticated",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      `Data fetching failed with status ${response.status}: ${JSON.stringify(
        data
      )}`
    );
  }
  console.log("return favourite color...");
  console.log(data);
  return {
    props: {
      email: AuthUser.email,
      favoriteColor: data.favoriteColor,
      emailVerified: AuthUser.emailVerified,
      someOtherProp: 'any other data can be added',
    },
  };
});

export default withAuthUser()(BarsPage)


/*
export default withApollo(BarsPage, {
    ssr: false
});*/