import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
} from '@chakra-ui/react'
import { useState, useEffect, useRef, ReactElement } from 'react'
import { CgDarkMode } from 'react-icons/cg'
import { VscColorMode } from 'react-icons/vsc'

import MobileNav from './MobileNav'
import Logo from './Logo'
import { SearchContextType } from '../types/global.types'

type HeaderProps = {
  email: string | null
  signOut: () => void
  searchBox: SearchContextType
}

const Header = (props: HeaderProps): ReactElement => {
  const { email, signOut, searchBox, ...rest } = props

  const { colorMode, toggleColorMode } = useColorMode()
  const bg = { light: 'white', dark: 'gray.800' }

  const inputRef = useRef<HTMLInputElement>()
  const inputElement = inputRef.current
  if (inputElement) {
    inputElement.focus()
  }

  return (
    <Box
      as="header"
      top="0"
      zIndex="4"
      bg={bg[colorMode]}
      left="0"
      right="0"
      borderBottomWidth="0px"
      width="full"
      height="3rem"
      {...rest}
    >
      <Box width="full" mx="auto" px={6} pr={[1, 6]} height="100%">
        <Flex
          size="100%"
          p={[0]}
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
            <Logo w="100%" h="100px" />
          </Box>
          <InputGroup display="block" width="100%" ml={16} mr={16}>
            <InputLeftElement
              children={<Icon name="search" color="gray.500" />}
            />
            <Input
              type="text"
              onChange={searchBox.onSearch}
              value={searchBox.search}
              //ref={inputElement}
              placeholder={`Search for deals (Press "/" to focus)`}
              bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
            />
          </InputGroup>

          <Flex align="center" color="gray.500">
            <IconButton
              aria-label={`Switch to ${
                colorMode === 'light' ? 'dark' : 'light'
              } mode`}
              variant="ghost"
              color="current"
              ml="2"
              fontSize="20px"
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <CgDarkMode /> : <VscColorMode />}
            />
            <MobileNav email={email} signOut={signOut} />
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default Header
