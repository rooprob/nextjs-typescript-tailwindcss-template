import Nav from '../components/nav'
import Link from 'next/link'
import Head from 'next/head'
import { markLoadingError } from 'next/dist/next-server/lib/router/router'

const posts = [
  { id: 1, link: '/posts/first-post', title: 'this page', time: '2020-10-23 20:33:00', content: 'first post' },
  { id: 2, link: '/posts/second-post', title: 'second page', time: '2020-10-23 20:33:00', content: 'second post' }
]

export default function IndexPage() {
  return (
    <div>
      <Head>
        <title>G17 structured project demo</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Nav />
      <main className="container max-w-c1 mx-auto">
        <h1>
          Next.js + Tailwind CSS
        </h1>
        <ul className='markdown'>
          {posts.map(post => (
            <li key={post.id}>
              <h3><Link href={post.link}><a>{post.title}</a></Link></h3>
              <time>{post.time}</time>
              <div
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}