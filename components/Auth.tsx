import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  useColorMode,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import Logo from '../components/Logo'

import firebase from 'firebase/app'

const AuthContent = ({ register, errors, type, ...rest }: any) => (
  <Stack {...rest}>
    <Box as="a" href="/" aria-label="daydrink, Back to homepage">
      <Logo pb={8} w="200px" mx="auto" />
    </Box>
    <FormControl isInvalid={errors.email && errors.email.message}>
      <FormLabel>Email Address</FormLabel>
      <Input
        autoFocus
        aria-label="Email Address"
        name="email"
        ref={register({
          required: 'Please enter your email.',
        })}
        placeholder="name@site.com"
      />
      <FormErrorMessage>
        {errors.email && errors.email.message}
      </FormErrorMessage>
    </FormControl>
    <FormControl isInvalid={errors.pass && errors.pass.message}>
      <FormLabel>Password</FormLabel>
      <Input
        aria-label="Password"
        name="pass"
        type="password"
        ref={register({
          required: 'Please enter a password.',
        })}
      />
      <FormErrorMessage>{errors.pass && errors.pass.message}</FormErrorMessage>
    </FormControl>
    <Button type="submit" mt={4} variantcolor="teal" variant="solid">
      {type}
    </Button>
  </Stack>
)

const FullScreenAuth = ({ type, onSubmit }: any) => {
  const { colorMode } = useColorMode()
  const { handleSubmit, register, errors } = useForm()

  return (
    <Flex align="center" justify="center" h="100vh">
      <AuthContent
        as="form"
        backgroundColor={[
          'none',
          colorMode === 'light' ? 'gray.100' : 'gray.900',
        ]}
        borderRadius={8}
        errors={errors}
        maxWidth="400px"
        onSubmit={handleSubmit((data) => onSubmit(data))}
        px={8}
        py={12}
        register={register}
        shadow={[null, 'md']}
        spacing={3}
        type={type}
        w="100%"
      />
    </Flex>
  )
}

const AuthModal = ({ isOpen, onClose, type, onSubmit }: any) => {
  const { handleSubmit, register, errors } = useForm()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={4}>
        <ModalCloseButton />
        <ModalBody>
          <Flex align="center" justify="center">
            <AuthContent
              as="form"
              errors={errors}
              onSubmit={handleSubmit((data) => onSubmit(data))}
              px={8}
              py={12}
              register={register}
              spacing={3}
              type={type}
              w="100%"
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export const withAuthModal = (Component: any) => (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const signUp = ({ email, pass }: any) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((response) => {
        toast({
          title: 'Success! 🍻',
          description: 'Your account has been created.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        onClose()
      })
      .catch((error: any) => {
        toast({
          title: 'An error occurred.',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }
  return (
    <>
      <AuthModal
        isOpen={isOpen}
        onClose={onClose}
        type="Sign Up"
        onSubmit={signUp}
      />
      <Component openAuthModal={onOpen} {...props} />
    </>
  )
}

export const withSignInRedirect = (Component: any) => (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const router = useRouter()

  const signIn = ({ email, pass }: any) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((response) => {
        router.push('/deals')
      })
      .catch((error: any) => {
        toast({
          title: 'An error occurred.',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/')
        toast({
          title: 'Signed out.',
          description: 'See you next time :)',
          status: 'info',
          duration: 9000,
          isClosable: true,
        })
      })
      .catch((error: any) => {
        toast({
          title: 'An error occurred.',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }

  return (
    <>
      <AuthModal
        isOpen={isOpen}
        onClose={onClose}
        type="Sign In"
        onSubmit={signIn}
      />
      <Component onSignIn={onOpen} onSignOut={signOut} {...props} />
    </>
  )
}

export default FullScreenAuth
