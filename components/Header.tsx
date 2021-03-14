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
import { AlcoholContextType, SearchContextType } from '../types/global.types'

// refactor out to keyboard shortcuts
const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false)

  const downHandler = ({ key }: any) => {
    console.log(`keyDown for ${key}`)
    if (key === targetKey) {
      console.log('setKeyPressed true')
      setKeyPressed(true)
    }
  }

  const upHandler = ({ key }: any) => {
    console.log(`keyUp for ${key}`)
    if (key === targetKey) {
      setKeyPressed(false)
      console.log('setKeyPressed false')
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [])

  return keyPressed
}

type HeaderProps = {
  email: string
  signOut: any
  searchBox: SearchContextType
  alcoholFilter: AlcoholContextType
}

const Header = (props: HeaderProps): ReactElement => {
  const { email, signOut, searchBox, alcoholFilter, ...rest } = props

  const { colorMode, toggleColorMode } = useColorMode()
  const bg = { light: 'white', dark: 'gray.800' }

  const slashPress = useKeyPress('/')

  const inputRef = useRef<HTMLInputElement>()
  const inputElement = inputRef.current
  if (inputElement) {
    inputElement.focus()
  }

  return (
    <Box
      pos="fixed"
      as="header"
      top="0"
      zIndex="4"
      bg={bg[colorMode]}
      left="0"
      right="0"
      borderBottomWidth="0px"
      width="full"
      height="4rem"
      {...rest}
    >
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
            <Logo w="100%" h="100px" />
          </Box>
          <InputGroup
            display={slashPress ? 'block' : 'none'}
            width="100%"
            ml={16}
            mr={16}
          >
            <InputLeftElement
              children={<Icon name="search" color="gray.500" />}
            />
            <Input
              type="text"
              onChange={searchBox.onSearch}
              value={searchBox.search}
              //ref={inputElement}
              autoFocus={slashPress}
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
            {!slashPress && <MobileNav email={email} signOut={signOut} />}
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default Header
