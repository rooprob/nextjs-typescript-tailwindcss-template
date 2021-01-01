import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../auth/initFirebase'
import { mapUserData } from './mapUserData'

import { AuthInfo } from '../../types/auth.types'
import { User } from '@firebase/auth-types'
import TokenService from '../../services/Token.service'
import { useAuth, ActionType } from '../../services/Auth.context'

initFirebase()

const useUser = () => {
  const [user, setUser] = useState<AuthInfo>()
  const [ authState, authDispatch ] = useAuth();
  const tokenService = new TokenService();

  const router = useRouter()

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        tokenService.deleteToken()
        authDispatch({
          type: ActionType.RemoveDetails
        })
        // Sign-out successful.
        router.push('/signedout')
      })
      .catch((e) => {
        console.error(e)
      })
  }

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener = firebase.auth().onIdTokenChanged(
      (user: User | null) => {
        if (user) {
          mapUserData(user).then((userData) => {
            tokenService.saveToken(userData);
            authDispatch({
              type: ActionType.SetDetails,
              payload: userData
            });
            setUser(userData);
          })
        } else {
          tokenService.deleteToken();
          authDispatch({
            type: ActionType.RemoveDetails
          });
          setUser(undefined);
        }
      }
    );

    const userFromCookie = tokenService.getToken();
    if (!userFromCookie) {
      router.push('/')
      return
    }
    setUser(userFromCookie)

    return () => {
      cancelAuthListener()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { user, logout }
}

export { useUser }