import { gql } from 'graphql-request'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { hygraph } from '../../services/hygraph'
import styles from '../../styles/Posts.module.css'

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts &#8226; ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>12 de dezembro de 2022</time>
            <strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, odio?</strong>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore animi eos consequuntur iste corporis. Ratione at veniam maxime quam quia.</p>
          </a>

          <a href="">
            <time>12 de dezembro de 2022</time>
            <strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, odio?</strong>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore animi eos consequuntur iste corporis. Ratione at veniam maxime quam quia.</p>
          </a>

          <a href="">
            <time>12 de dezembro de 2022</time>
            <strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, odio?</strong>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore animi eos consequuntur iste corporis. Ratione at veniam maxime quam quia.</p>
          </a>
        </div>
      </main>
    </>

  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = hygraph
  const query = gql`
    {
      posts(stage: PUBLISHED) {
        title
        slug
        id
        createdAt
        content {
          markdown
        }
      }
    }
  `
  const response = await data.request(query)

  console.log(response)

  return {
    props: {}
  }

}