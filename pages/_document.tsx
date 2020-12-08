import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-white text-black dark:bg-black dark:text-white">
          <main className="container max-w-c1 mx-auto">
            <Main />
            <NextScript />
          </main>
        </body>
      </Html>
    );
  }
}

export default MyDocument;