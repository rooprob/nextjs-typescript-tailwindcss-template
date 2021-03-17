import { Text, Flex, Spinner } from '@chakra-ui/react'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth'

//import {useDeals} from '../graphql/hooks';
import { useSearch } from '../services/Search.context'
import { useAlcoholFilter } from '../services/Alcohol.context'
// import {withApollo} from '../graphql/apollo';
import App from '../components/App'
import DealCard from '../components/DealCard'
import AddDealModal from '../components/AddDealModal'
import EmptySearch from '../components/EmptySearch'
import { AlcoholType, DealCardProps } from '../types/global.types'
import getAbsoluteURL from '../utils/getAbsoluteURL'

interface Deals {
  deals: DealCardProps[]
}

const DealsPage = ({ emailVerified, favoriteColor }: any) => {
  const AuthUser = useAuthUser()

  const { search } = useSearch()
  const { dayOfWeek, alcoholTypeFilter } = useAlcoholFilter()
  // const {data, loading} = useDeals(dayOfWeek);
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 2)
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 45)

  const data: Deals = {
    deals: [
      {
        id: '42',
        description: 'Really big beer night out',
        alcoholType: 'BEER',
        daysActive: [startDate, endDate],
        location: [-123, 72],
        score: 4,
        userDeals: 'win',
      },
      {
        id: '43',
        description: 'Really big wine night out',
        alcoholType: 'WINE',
        daysActive: [startDate, endDate],
        location: [-123, 72],
        score: 2,
        userDeals: 'win',
      },
      {
        id: '44',
        description: 'Really big food night out',
        alcoholType: 'FOOD',
        daysActive: [startDate, endDate],
        location: [-123, 72],
        score: 1,
        userDeals: 'win',
      },
    ],
  }
  const loading = false

  const matchesSearch = (deal: DealCardProps) =>
    deal.description.toLowerCase().includes(search.toLowerCase())
  const matchesAlcoholType = (deal: DealCardProps) =>
    alcoholTypeFilter.includes(deal.alcoholType)
  const allDeals = data ? data.deals : []
  const filteredDeals = allDeals
    .filter(matchesSearch)
    .filter(matchesAlcoholType)

  return (
    <App
      email={AuthUser.email}
      signOut={AuthUser.signOut}
      width="full"
      maxWidth="1280px"
      mx="auto"
      px={6}
      py={6}
    >
      <Text mb={2} fontSize="sm">
        {'Active '}
        <b>{dayOfWeek}</b>
        {' in '}
        <b>{'Des Moines'}</b>
      </Text>
      {loading ? (
        <Flex pt={24} align="center" justify="center">
          <Spinner size="xl" label="Loading Deals" />
        </Flex>
      ) : (
        <>
          {filteredDeals.length ? (
            filteredDeals.map((deal) => <DealCard key={deal.id} {...deal} />)
          ) : (
            <EmptySearch />
          )}
          <Flex justify="flex-end" as="i" color="gray.500">
            {`Showing ${filteredDeals.length} out of ${allDeals.length} deals in Des Moines`}
          </Flex>
          <Flex mt={8} display={['block', 'none', 'none', 'none']}>
            <AddDealModal />
          </Flex>
        </>
      )}
    </App>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async (ctx: any) => {
  // Optionally get any other props
  const { AuthUser } = ctx

  // If the user is not authenticated at all, do a simple custom redirect
  // to login page (equivalent to REDIRECT_TO_LOGIN parameter of withAuthUserSSR).
  if (!AuthUser || !AuthUser.id) {
    console.log('Simply not logged in...')
    console.log(AuthUser)

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
    console.log("User hasn't validated their email yet")
    return {
      redirect: {
        destination: `/verify?verifyEmail=true&thenGoToPage=${encodeURIComponent(
          ctx.resolvedUrl,
        )}`,
        permanent: false,
      },
    }
  }
  // And finally if everything is OK, we return a props object as usual.

  const token = await AuthUser.getIdToken()
  const endpoint = getAbsoluteURL('/api/example/color', ctx.req)
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: token || 'unauthenticated',
    },
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(
      `Data fetching failed with status ${response.status}: ${JSON.stringify(
        data,
      )}`,
    )
  }
  console.log('return favourite color...')
  console.log(data)
  return {
    props: {
      email: AuthUser.email,
      favoriteColor: data.favoriteColor,
      emailVerified: AuthUser.emailVerified,
      someOtherProp: 'any other data can be added',
    },
  }
})

export default withAuthUser()(DealsPage)

/*
export default withApollo(DealsPage, {
    ssr: false
});*/
