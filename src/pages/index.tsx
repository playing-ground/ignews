import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import SubscribeButton from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

import styles from './styles/Home.module.css'

type HomeProps = {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home &#8226; ig.news</title>
      </Head>

      <main className={styles.container}>
        <section className={styles.leftSection}>
          <span className={styles.welcome}>👋 Hey, welcome!</span>
          <h1 className={styles.title}>News about <br />
            the <span>React</span> world.</h1>
          <p className={styles.description}>
            Get access to all posts <br />
            <span>for {product.amount}/month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <div className={styles.rightSection}>
          <Image
            src="/images/avatar.svg"
            alt=""
            width={450}
            height={450}
            priority
          />
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1M0t6oJeLf7ZZttSFcWcErHW')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount! / 100),
  }

  return {
    props: { product },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}