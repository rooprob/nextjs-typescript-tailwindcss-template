import { useToast } from '@chakra-ui/react'
import { withAuthUser, AuthAction } from 'next-firebase-auth'

import Auth from '../components/Auth'
import { useRouter } from 'next/router'

import firebase from 'firebase/app'

type SignUpProps = {
  email: string
  password: string
}

const SignUpPage = () => {
  const toast = useToast()
  const router = useRouter()

  const signUp = ({ email, password }: SignUpProps) => {
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

  return <Auth type="Sign Up" onSubmit={signUp} />
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(SignUpPage)
