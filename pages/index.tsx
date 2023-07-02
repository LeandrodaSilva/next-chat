import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Chat from "../components/Chat/Chat";
import React, {useEffect} from "react";
import {useSsrComplectedState} from "../hooks/useSSRCompletedState";
import {useRecoilState} from "recoil";
import {langState} from "../recoil/atoms/langState";
import {getUserLang} from "../hooks/useLocalization";
import LoginBtn from "../components/LoginBtn";
import lazy from "next/dynamic";
import {userState} from "../recoil/atoms/userState";
const LeprojComponentsWrapper = lazy(() => import("../components/LeprojComponents"), {
  ssr: false
});


export default function Home() {
  const [, setLang] = useRecoilState(langState);
  const setSsrCompleted = useSsrComplectedState();
  const [user, setUser] = useRecoilState<IUser>(userState);

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
        <title>Chat</title>
        <meta name="description" content="Chat with GPT" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <LoginBtn/>
      </header>

      <main className={styles.main}>
        <Chat />
      </main>

      <footer className={styles.footer}>
        <LeprojComponentsWrapper
          user={user}
        />
      </footer>
    </div>
  )
}
