import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react'
import NextLink from 'next/link'
import { ReactElement } from 'react'

import Logo from '../components/Logo'

export const Container: React.FC = (props) => (
  <Box width="full" maxWidth="1280px" mx="auto" px={6} {...props} />
)

type IndexHeaderProps = {
  email: string
  onSignOut: () => void
}

const IndexHeader: React.FC<IndexHeaderProps> = ({ email, onSignOut }) => {
  return (
    <Box as="header" width="full" height="4rem">
      <Box width="full" mx="auto" px={6} pr={[1, 6]} height="100%">
        <Flex
          size="100%"
          p={[0, 6]}
          pl={[0, 4]}
          align="center"
          justify="space-between"
        >
          <Box
            as="a"
            d="block"
            href="/"
            aria-label="daydrink, Back to homepage"
          >
            <Logo w="100%" />
          </Box>
          <Flex align="center">
            {email ? (
              <>
                <p>Signed in as {email}</p>
                <Button onClick={onSignOut} variant="ghost">
                  {'Sign Out'}
                </Button>
              </>
            ) : (
              <NextLink href="/auth">
                <Button variant="ghost">{'Sign In'}</Button>
              </NextLink>
            )}
            <NextLink href="/deals" passHref>
              <Button as="a">{'Find Deals'}</Button>
            </NextLink>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
export default IndexHeader
