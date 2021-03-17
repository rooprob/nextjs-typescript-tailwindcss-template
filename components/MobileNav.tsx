import {
  Drawer,
  DrawerBody,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import SideNav from './SideNav'
import Hamburger from '../icons/Hamburger'

const useRouteChanged = (callback: () => void) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      callback()
      console.log('App is changing to: ', url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, callback])
}

type MobileNavProps = {
  email: string
  signOut: () => void
}
const MobileNav: React.FC<MobileNavProps> = ({ email, signOut }) => {
  const { isOpen, onToggle, onClose } = useDisclosure()

  useRouteChanged(onClose)

  return (
    <>
      <IconButton
        aria-label="Navigation Menu"
        fontSize="20px"
        variant="ghost"
        display={{ sm: 'inline-flex', md: 'none' }}
        color="gray.500"
        icon={<Hamburger />}
        onClick={onToggle}
      />
      <Drawer size="xs" isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody p={0}>
            <SideNav top="0" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MobileNav
