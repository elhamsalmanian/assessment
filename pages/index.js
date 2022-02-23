

import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Students List | Home</title>
        <meta name="keywords" content="students"/>
      </Head>
      <div>
        <h1 className={styles.title}>Students Full Name</h1>
        <Link href="/students/">
          <a className={styles.btn}>See Students Listing</a>
        </Link>
      </div>
    </>
  )
}