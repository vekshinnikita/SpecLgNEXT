import Footer from "./Footer"
import Header from "./Header"

export default ({children}) => {

    return (
        <>
        <Header/>
        {children}
        <Footer/>
        </>
    )
}