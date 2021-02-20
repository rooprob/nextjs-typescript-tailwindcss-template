import Link from 'next/link'
import Layout from '../components/Layout'

const FoodPage = (props: any) => {
  return (
    <Layout title="Food | Next.js + TypeScript Example">
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