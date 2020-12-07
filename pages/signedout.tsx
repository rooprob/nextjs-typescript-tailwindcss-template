import Link from 'next/link'

const SignedOut = () => {
    return (
      <div>
        <p>Signed out!</p>
        <Link href="/auth">Log back in?</Link>
      </div>
    )
  }
  
  export default SignedOut 