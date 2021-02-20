import { GetStaticProps, NextPageContext } from 'next'
import Link from 'next/link'

import { AuthInfo } from '../../types/auth.types'
import { User } from '../../types/model.types'
import { sampleUserData } from '../../utils/sample-data'
import Layout from '../../components/Layout'
import List from '../../components/ListUsers'

import TokenService from '../../services/Token.service';

type Props = {
  user: AuthInfo,
  logout: any,
  items: User[]
}

const UserIndex = ({ items }: Props) => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>Users List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <List items={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

UserIndex.getInitialProps = async(ctx: NextPageContext) => {

  console.log("Checking token");
  const tokenService = new TokenService();
  await tokenService.authenticateTokenSsr(ctx);

  const items: User[] = sampleUserData
  return { props: { items } }
}

export default UserIndex 