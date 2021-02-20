import { User } from '@firebase/auth-types'
import { AuthInfo } from '../../types/auth.types'

export const mapUserAuthInfo = async (user: User): Promise<AuthInfo> => {
  const { uid, email } = user
  const token = await user.getIdToken(true)
  return {
    id: uid,
    email,
    token,
  }
}