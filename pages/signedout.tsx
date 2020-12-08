import Link from 'next/link'
import Layout from '../components/Layout';

const SignedOut = () => {
  return (
    <Layout title="Signed out | Next.js + TypeScript Example">
      <h1>Signed out!</h1>
      <p>You have successfully signed out</p>
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
      <p>
        <Link href="/auth">
          <a>Sign in</a>
        </Link>
      </p>
    </Layout>
  )
}
  
export default SignedOut 