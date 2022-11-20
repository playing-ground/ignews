import { gql } from 'graphql-request'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { hygraph } from '../../services/hygraph'

import styles from '../../styles/Posts.module.css'

type PostProps = {
  posts: [{
    id: string
    title: string
    slug: string
    excerpt: string
    publishedAt: string
  }]
}

export default function Posts({ posts }: PostProps) {
  return (
    <>
      <Head>
        <title>Posts &#8226; ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.id} href={`/posts/${post.slug}`}>
              <time>{post.publishedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </>

  )
}

type Post = {
  title: string
  slug: string
  id: string
  publishedAt: string
  content: { text: string }
}

export const getStaticProps: GetStaticProps = async () => {
  const data = hygraph
  const query = gql`
    {
      posts(stage: PUBLISHED) {
        title
        slug
        id
        publishedAt
        content {
          text 
        }
      }
    }
  `
  const response = await data.request<{ posts: Post[] }>(query)
  const posts = response.posts.map((post) => {
    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: (post.content.text.substring(0, 500) + '...').replace(/\\n/g, '') ?? '',
      publishedAt: new Date(post.publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return {
    props: { posts }
  }

}