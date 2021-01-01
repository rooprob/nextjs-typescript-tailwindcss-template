import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

import { useUser } from '../utils/auth/useUser';

type Props = {
  children?: ReactNode
  title?: string
}

type UserProfileProps = {
  children?: ReactNode
}

const LoginButton = () => 
  <Link href={'/auth'}>
    <a>Sign in</a>
  </Link>

const UserProfile = () => {
  const { user, logout } = useUser(); 
  if (! user ||  !user.email) {
    return <div />
  }
  return(
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
  )
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {

  const { user, logout } = useUser(); 
  return (
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

          {user && user.email ? 
                    <UserProfile />
                  : <LoginButton />
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
}


export default Layout