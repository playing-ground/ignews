import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'

export default function Home() {
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
            <span>for $9,90/month</span>
          </p>
        </section>
        <div className={styles.rightSection}>
          <Image src="/images/avatar.svg" alt="" width={450} height={450} />
        </div>
      </main>
    </>
  )
}
