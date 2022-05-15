import Document, { Html, Head, Main, NextScript } from 'next/document'
import { render } from 'react-dom'

export default class MyDocument extends Document {
  render(){
    return(
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <script defer src="https://kit.fontawesome.com/0173c05275.js" crossOrigin="anonymous"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
    )
  }
}