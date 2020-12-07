import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../auth/initFirebase'
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie,
} from './userCookies'
import { mapUserData } from './mapUserData'

import { AuthUser } from '../../interfaces'
import { User } from '@firebase/auth-types'

initFirebase()

const useUser = () => {
  const [user, setUser] = useState<AuthUser>()
  const router = useRouter()

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
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
      async (user: User | null) => {
        if (user) {
          console.log("User successful");
          const userData = await mapUserData(user);
          setUserCookie(userData);
          setUser(userData);
          console.log(userData);
        } else {
          console.log("Unsuccessful");
          removeUserCookie();
          setUser(undefined);
        }
      }
    );

    const userFromCookie = getUserFromCookie()
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

  console.log("returning user:", user);
  console.log("returning login:", logout);
  return { user, logout }
}

export { useUser }