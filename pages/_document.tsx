import React from 'react';
import NextDocument, {Html, Head, Main, DocumentContext, NextScript} from 'next/document';

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta title="Daydrink | Find the best drink deals and happy hours in your area." />
          <link rel="icon" sizes="96x96" href="/favicons/favicon.ico" />
          <meta name="theme-color" content="#319795"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
};

export default Document;