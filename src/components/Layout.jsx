

import Footer from './Footer';
import NavBar from './NavBar';
// eslint-disable-next-line react/prop-types
const Layout = ({children}) => {

  return (
    <>
      <div className='md:flex'>
          <NavBar />
          <main className='md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll'>
              {children}
          </main>
      </div>
      <Footer />
    </>
  )
}

export default Layout