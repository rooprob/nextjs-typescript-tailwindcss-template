import Link from 'next/link'
import Layout from '../../components/Layout'

export default function SecondPost() {
  return (
      <Layout title="Second post">
          <h1>Second Post</h1>
          <h2>
              <Link href="/">
                  <a>Back to home</a>
              </Link>
          </h2>
      </Layout>
  )
}
