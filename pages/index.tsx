import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Chat from "../components/Chat/Chat";
import React, {useEffect} from "react";
import {useSsrComplectedState} from "../hooks/useSSRCompletedState";
import {useRecoilState} from "recoil";
import {langState} from "../recoil/atoms/langState";
import {getUserLang} from "../hooks/useLocalization";
import Fps from "../components/FPS/FPS";

export default function Home() {
  const [, setLang] = useRecoilState(langState);
  const setSsrCompleted = useSsrComplectedState();

  useEffect(setSsrCompleted, [setSsrCompleted])

  useEffect(() => {
    const lang = getUserLang();
    document.documentElement.lang = lang;
    document.querySelector('html')?.setAttribute('lang', lang);
    setLang(lang);
  }, [setLang]);

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
