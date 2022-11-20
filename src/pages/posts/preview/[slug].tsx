import { gql } from "graphql-request"
import { GetStaticProps } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { hygraph } from "../../../services/hygraph"

import styles from '../../../styles/Post.module.css'

type PostPreviewProps = {
  data: {
    title: string
    slug: string
    id: string
    publishedAt: string
    content: string
  }
}

export default function PostPreview({ data }: PostPreviewProps) {
  const [showChild, setShowChild] = useState(false);
  const title = `${data.title} &#8226; ig.news`
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    setShowChild(true);
    if (session.data?.activeSubscription) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  if (!showChild) {
    return null;
  }

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
            className={`${styles.content} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
          <Link href='/' className={styles.continueReading}>
            Would you like to continue reading?
            <span>Subscribe now 🤗</span>
          </Link>
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

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug?.toString()

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
    content: post?.content?.html.slice(0, 2000) || '',
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