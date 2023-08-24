import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className='flex gap-5 items-center p-10 h-screen'>
      <div
        className='p-10 flex-1'
      >
        <img 
          src="/img/ErrorPage.jpg" 
          alt="Error Page image"  
          className='rounded-lg'
        />
      </div>
      <div className='flex-1'>
        <h2
          className='uppercase font-bold '
        >Something went wrong!</h2>
        <Link 
          to='/'
          className='font-black underline'
        >
          You can go back home
        </Link>
      </div>
      
    </div>
  )
}

export default ErrorPage