import Document, { Html, Head, Main, NextScript } from 'next/document'
import { render } from 'react-dom'

export default class MyDocument extends Document {
  render(){
    return(
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /> 
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Грузоперевозки всех видов и направлений."/>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link rel="apple-touch-icon" sizes="57x57" href="/static/apple-icon-57x57.png"/>
        <link rel="apple-touch-icon" sizes="60x60" href="/static/apple-icon-60x60.png"/>
        <link rel="apple-touch-icon" sizes="72x72" href="/static/apple-icon-72x72.png"/>
        <link rel="apple-touch-icon" sizes="76x76" href="/static/apple-icon-76x76.png"/>
        <link rel="apple-touch-icon" sizes="114x114" href="/static/apple-icon-114x114.png"/>
        <link rel="apple-touch-icon" sizes="120x120" href="/static/apple-icon-120x120.png"/>
        <link rel="apple-touch-icon" sizes="144x144" href="/static/apple-icon-144x144.png"/>
        <link rel="apple-touch-icon" sizes="152x152" href="/static/apple-icon-152x152.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-icon-180x180.png"/>
        <link rel="icon" type="image/png" sizes="192x192"  href="/static/android-icon-192x192.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png"/>
        <link rel="manifest" href="/manifest.json"/>
        <meta name="msapplication-TileColor" content="#ffffff"/>
        <title>СПЕЦЛОГИСТИКА</title>
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
        <meta name="theme-color" content="#ffffff"></meta>
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