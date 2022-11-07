import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Chat from "../components/Chat/Chat";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Chat />
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
