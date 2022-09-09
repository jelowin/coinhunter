import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { CssBaseline } from "@nextui-org/react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles]),
    };
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          {CssBaseline.flush()}
          <link
            as="font"
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="preload"
          />
          <link
            as="font"
            href="https://fonts.googleapis.com/css2?family=Barlow&display=optional"
            rel="preload"
          />
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
