import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { AuthUser } from '../interfaces'

type Props = {
  children?: ReactNode
  title?: string
  user?: AuthUser,
  logout?: () => Promise<void>,
}

type UserProfileProps = {
  children?: ReactNode
  user: AuthUser,
  logout: () => Promise<void>,
}

const LoginButton = () => 
  <Link href={'/auth'}>
    <a>Sign in</a>
  </Link>

const UserProfile = ({user, logout}: UserProfileProps) => 
  <div>Hi {user.email}
    <p
      style={{
        display: 'inline-block',
        color: 'blue',
        textDecoration: 'underline',
        cursor: 'pointer',
      }}
      onClick={() => logout()}
    >
      Log out
    </p>
  </div>

const Layout = ({ children, user, logout, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/"><a>Home</a></Link>
        {' '} |{' '}
        <Link href="/about"><a>About</a></Link>
        {' '} |{' '}
        <Link href="/users"><a>Users List</a></Link>
        {' '} |{' '}
        <Link href="/api/users"><a>Users API</a></Link>
        {' '} |{' '}
        <Link href="/food"><a>Food List</a></Link>
        {' '} |{' '}
        <Link href="/api/food"><a>Food API</a></Link>
        {' '} |{' '}

        {user === undefined || logout === undefined ? <LoginButton />
                : <UserProfile user={user} logout={logout} />
        }
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
)

export default Layout