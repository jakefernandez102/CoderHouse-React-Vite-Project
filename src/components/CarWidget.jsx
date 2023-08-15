import { useState } from "react";
import CarInventory from "./CarInventory";
import useStore from '../hooks/useStore';
import { Button } from 'antd';
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";



const CarWidget = () => {
    const [isActive, setIsActive] = useState(false)
    
    const {car,setOpenSignInModal} = useStore()



  return (
    <>
        <div className='w-full bg-black h-14 flex justify-end p-5 gap-5 '>
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