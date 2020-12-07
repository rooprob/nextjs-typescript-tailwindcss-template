import { User } from '@firebase/auth-types'
import { AuthUser } from '../../interfaces'

export const mapUserData = async (user: User): Promise<AuthUser> => {
  const { uid, email } = user
  const token = await user.getIdToken(true)

  return {
    id: uid,
    email,
    token,
  }
}