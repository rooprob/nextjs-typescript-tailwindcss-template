import cookies from 'js-cookie'

import { AuthUser } from '../../interfaces'

export const getUserFromCookie = () => {
  const cookie = cookies.get('auth')
  if (!cookie) {
    return
  }
  return JSON.parse(cookie)
}

export const setUserCookie = (user: AuthUser) => {
  cookies.set('auth', user, {
    // firebase id tokens expire in one hour
    // set cookie expiry to match
    expires: 1 / 24,
  })
}

export const removeUserCookie = () => cookies.remove('auth')