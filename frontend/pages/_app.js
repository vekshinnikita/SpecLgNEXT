import '../styles/index.scss'
import 'macro-css';
import { wrapper } from '../state/store'

function MyApp({ Component, pageProps }) {

    return (
    <>

        <Component {...pageProps} />
      
    </>
    )
  }

export default wrapper.withRedux(MyApp)