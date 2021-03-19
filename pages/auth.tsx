import { useToast } from '@chakra-ui/react'
import { withAuthUser, AuthAction } from 'next-firebase-auth'

import Auth from '../components/Auth'
import { useRouter } from 'next/router'

import firebase from 'firebase/app'

type SignInProps = {
  email: string
  password: string
}

const AuthPage = () => {
  const toast = useToast()
  const router = useRouter()

  const signIn = ({ email, password }: SignInProps) => {
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

  return <Auth type="Sign In" onSubmit={signIn} />
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(AuthPage)
