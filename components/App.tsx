import React, { ReactElement } from 'react'
import { useColorMode, Box, BoxProps } from '@chakra-ui/react'

import { useSearch } from '../services/Search.context'
import SideNav from '../components/SideNav'
import Header from '../components/Header'

type AppProps = {
  email: string | null
  signOut: () => void
}

const App: React.FC<AppProps & BoxProps> = ({
  children,
  email,
  signOut,
  ...rest
}) => {
  const { colorMode } = useColorMode()
  const searchBox = useSearch()

  return (
    <>
      <Header email={email} signOut={signOut} searchBox={searchBox} />
      <Box>
        <SideNav
          display={['none', null, 'block']}
          maxWidth="15rem"
          width="full"
        />
        <Box pl={[0, null, '15rem']} mt="4rem">
          <Box
            as="section"
            backgroundColor={colorMode === 'light' ? 'gray.100' : 'gray.900'}
            minHeight="calc(100vh - 4rem)"
          >
            <Box {...rest}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default App
