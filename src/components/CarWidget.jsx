import { useState } from "react";
import CarInventory from "./CarInventory";
import useStore from '../hooks/useStore';
import { Button } from 'antd';
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";



const CarWidget = () => {
    const [isActive, setIsActive] = useState(false)
    const [user,setUser] = useState(true)
    
    const {car,setOpenSignInModal} = useStore()



  return (
    <>
        <div className='w-full bg-black h-14 flex justify-end items-center px-5 gap-5 '>
          <div className='flex items-center gap-5'>
            {
              user 
              ?
              ( <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>)
              :
              (<img src="/img/jewerly.avif" width={50}  alt="user image" className='rounded-full' />)
            }
          </div>
          <Button  type="primary" onClick={() => setOpenSignInModal(true)} >
            Sign In
          </Button>
          <a 
              href="#"
              onClick={()=> setIsActive(!isActive)}
              className='cursor-pointer relative '
              rel='noreferrer'
          >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <div className='notification fixed'>{car.length}</div>
          </a>
        </div>
        {
            isActive &&
              <div>
                  <CarInventory
                      car={car}
                  />
              </div>

  
            
        }

        <SignInModal/>
        <SignUpModal/>
        
    </>
  )
}

export default CarWidget