import Footer from "../Footer"
import Header from "../Header"


const Layout = ({children}) => {
     return (
          <div className="page-wrapper">
               <Header />
               <main className="main-content">
                    {children}
               </main>
               <Footer />
          </div>
     )
}

export default Layout
