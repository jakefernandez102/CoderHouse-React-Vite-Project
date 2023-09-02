

import { useEffect } from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import useAuth from '../hooks/useAuth';
// eslint-disable-next-line react/prop-types
const Layout = ({children}) => {

  const {auth,setCurrentUser,getUserWhenLoggedIn,currentUser}=useAuth()

  useEffect(()=>{
    const loadUser = async ()=>{
      if(auth?.currentUser){
        setCurrentUser(await getUserWhenLoggedIn(auth?.currentUser.email))

      }
    }
    loadUser()
  },[auth])

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