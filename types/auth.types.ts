export interface RegisterIn {
  firstName: string
  lastName: string
  email: string
  password: string
}
export interface LoginIn {
  email: string
  password: string
}
export interface AuthInfo {
  id: string
  email: string | null
  token: string
}