import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  StackProps,
  useColorMode,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'

import { DeepMap, FieldError, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import Logo from './Logo'

import firebase from 'firebase/app'
import React from 'react'

interface AuthFormData {
  email: string
  password: string
}

type AuthContentProps = {
  errors: DeepMap<AuthFormData, FieldError>
  register: () => void
  type: string
}

type CompositeAuthContent = AuthContentProps & StackProps

const AuthContent: React.FC<CompositeAuthContent> = ({
  register,
  errors,
  type,
  ...rest
}) => (
  <Stack {...rest}>
    <Box as="a" href="/" aria-label="daydrink, Back to homepage">
      <Logo pb={8} w="200px" mx="auto" />
    </Box>
    <FormControl
      isInvalid={!!errors?.email}
      errortext={errors?.email?.message}
      isRequired
    >
      <FormLabel>Email Address</FormLabel>
      <Input autoFocus aria-label="Email Address" name="email" ref={register} />
      <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
      <FormHelperText>Please provide your email address</FormHelperText>
    </FormControl>
    <FormControl
      isInvalid={!!errors?.password}
      errortext={errors?.password?.message}
      isRequired
    >
      <FormLabel>Password</FormLabel>
      <Input
        aria-label="Password"
        name="password"
        type="password"
        ref={register}
      />
      <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
    </FormControl>
    <Button type="submit" mt={4} variantcolor="teal" variant="solid">
      {type}
    </Button>
  </Stack>
)

type FullScreenAuthProps = {
  type: string
  onSubmit: (data: AuthFormData) => void
}
const FullScreenAuth: React.FC<FullScreenAuthProps> = ({ type, onSubmit }) => {
  const { colorMode } = useColorMode()
  const { register, handleSubmit, errors } = useForm<AuthFormData>()

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

type AuthModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: AuthFormData) => void
  type: string
}
const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  type,
  onSubmit,
}) => {
  const { register, handleSubmit, errors } = useForm<AuthFormData>()

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

type AuthModalComponent = {
  openAuthModal: () => void
}

export const withAuthModal = (
  Component: React.FC<AuthModalComponent>,
) => (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const signUp = ({ email, password }: { email: string; password: string }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        toast({
          title: 'Success! 🍻',
          description: 'Your account has been created.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        onClose()
      })
      .catch((error) => {
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
      <Component openAuthModal={onOpen} />
    </>
  )
}

type AuthRedirectedComponent = {
  onSignIn: () => void
  onSignOut: () => void
}
export const withSignInRedirect = (
  Component: React.FC<AuthRedirectedComponent>,
) => (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const router = useRouter()

  const signIn = ({ email, password }: { email: string; password: string }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push('/deals')
      })
      .catch((error) => {
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
      <Component onSignIn={onOpen} onSignOut={signOut} />
    </>
  )
}

export default FullScreenAuth
