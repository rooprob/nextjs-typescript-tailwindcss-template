import Link from 'next/link'
import Layout from '../components/Layout'

const FoodPage = (props: any) => {
  const { user, logout } = props;
  return (
    <Layout title="Food | Next.js + TypeScript Example" user={user} logout={logout}>
      <h1>Food</h1>
      <p>This is the food page</p>
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  )
}

export default FoodPage