import { gql } from "graphql-request"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import { hygraph } from "../../services/hygraph"

import styles from '../styles/Post.module.css'

type PostProps = {
  data: {
    title: string
    slug: string
    id: string
    publishedAt: string
    content: string
  }
}

export default function Post({ data }: PostProps) {
  const title = `${data.title} &#8226; ig.news`

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1 className={styles.title}>{data.title}</h1>
          <time className={styles.date}>{data.publishedAt}</time>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: data.content }}
          >
          </div>
        </article>

      </main>
    </>
  )

}

type Post = {
  title: string
  slug: string
  id: string
  publishedAt: string
  content: { html: string }
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req })
  const slug = params?.slug?.toString()

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const query = gql`
    {
      post(where: {slug: ${'"' + slug + '"'}}) {
        id
        title
        slug
        publishedAt
        content {
          html
        }
      }
    }
  `
  const response = await hygraph.request<{ post: Post }>(query)
  const { post } = response
  const data = {
    id: post?.id || '',
    title: post?.title || '',
    slug: post?.slug || '',
    content: post?.content?.html || '',
    publishedAt: new Date(post?.publishedAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }) || ''
  }

  return {
    props: { data }
  }
}