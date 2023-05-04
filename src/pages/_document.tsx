import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  override render() {
    return (
      <Html>
        <Head>
          <meta property="og:title" content="TeacherList" />
          <meta
            property="og:description"
            content="先生一覧を表示するテストアプリです"
          />
          <meta charSet="utf-8" />
          <meta httpEquiv="content-language" content="ja" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;