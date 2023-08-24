/* eslint-disable react/prop-types */

import Logo from '/img/Logo.png'
import Categories from './Categories';
import useStore from '../hooks/useStore';


const NavBar = () => {

    const { categories } = useStore()
    return (
    <aside className='md:w-4/12 xl:w-1/4 2xl:w-1/5 p-5'>
        <div className=''>


            <img 
                src={Logo} 
                alt="Logo Image" 
                width={150} 
                height={150} 
                className='block mx-auto'
            />
        </div>
        <nav>
            <Categories categories={categories}/>
        </nav>
    </aside>
    )
}

export default NavBar