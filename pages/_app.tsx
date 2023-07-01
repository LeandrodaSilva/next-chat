import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {RecoilRoot,} from 'recoil';
import React from "react";
import {SessionProvider} from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </RecoilRoot>
  )
}
