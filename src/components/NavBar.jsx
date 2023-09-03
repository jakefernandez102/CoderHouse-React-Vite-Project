/* eslint-disable react/prop-types */

import Logo from '/img/Logo.png'
import Categories from './Categories';
import useStore from '../hooks/useStore';
import { Link } from 'react-router-dom';


const NavBar = () => {

    const { categories } = useStore()
    return (
    <aside className='md:w-4/12 xl:w-1/4 2xl:w-1/5 p-5'>
        <div className=''>

            <Link
                to='/'
            >
                <img 
                    src={Logo} 
                    alt="Logo Image" 
                    width={150} 
                    height={150} 
                    className='block mx-auto'
                    />
            </Link>
        </div>
        <nav>
            <Categories categories={categories}/>
        </nav>
    </aside>
    )
}

export default NavBar