import "~/styles/reset.css";
import "~/styles/_globals.scss";

import type { AppProps } from 'next/app';
import Head from 'next/head'

function App({ Component }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component />
    </>
  )
}

export default App