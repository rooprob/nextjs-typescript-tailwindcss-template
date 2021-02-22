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

export interface UserInfo {
  email: string | null
}

export interface AuthStateContextType {
  userId: string | undefined;
  user: AuthInfo | undefined;
  signin: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  signout: () => void;
  sendPasswordResetEmail: (email: string) => void;
  confirmPasswordReset: (password: string, code: string) => void;
}