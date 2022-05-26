import '../styles/index.scss'
import 'macro-css';
import { wrapper } from '../state/store'
import MainLayout from '../layout/MainLayout'

function MyApp({ Component, pageProps }) {

    return (
    <>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
    )
  }

export default wrapper.withRedux(MyApp)