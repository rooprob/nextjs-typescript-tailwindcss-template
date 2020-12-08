import Link from 'next/link'

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Layout from '../components/Layout';

import useSWR from 'swr';

const posts = [
  { id: 1, link: '/posts/first-post', title: 'this page', time: '2020-10-23 20:33:00', content: 'first post' },
  { id: 2, link: '/posts/second-post', title: 'second page', time: '2020-10-23 20:33:00', content: 'second post' }
]

const fetcher = (url: string, token: string) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({'Context-Type': 'application/json', token}),
    credentials: 'same-origin',
  }).then((res) => res.json());

export default function IndexPage(props: any) {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logout } = props;
  const { data, error } = useSWR(
    user ? ['/api/food', user.token]: null,
    fetcher
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  return (
    <Layout title="Darkmode, Typescript, Tailwind 2.0, Next.js" user={user} logout={logout}>
      <h1>Darkmode + Next.js + Tailwind CSS</h1>
      <ul className="markdown">
        {posts.map((post) => (
          <li key={post.id}>
            <h3>
              <Link href={post.link}>
                <a>{post.title}</a>
              </Link>
            </h3>
            <time>{post.time}</time>
            <div
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />
          </li>
        ))}
      </ul>
      <button onClick={switchTheme}>Change theme</button>
    </Layout>
  );
}