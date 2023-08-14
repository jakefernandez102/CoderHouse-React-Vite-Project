/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import Logo from '/img/Logo.png'
import { useState } from 'react';
import axios from 'axios';
import Categories from './Categories';


const NavBar = () => {

    const [categories,setCategories] = useState([])

    useEffect(()=>{

        const getCategories = async () =>{
            try {
                // const {data} = await axios.get(`${import.meta.env.VITE_API_PRODUCTS_URL}/categories`)
                const {data} = await axios.get(`https://api.escuelajs.co/api/v1/categories`)
                
                // buildSubcategorie(data)
                setCategories(data)
            } catch (error) {
                console.log(error)
            }
        }
        getCategories();

    },[])

    // const buildSubcategorie = (categories) =>{
    //     let subcategorie=[];
    //     const subcategoriesBuilt = categories.map(categorie => {
            
    //         if(categorie.split(' ')[1] === 'clothing'){
    //             subcategorie.push({name:categorie})
    //         }
    //         if(categorie.split(' ').length === 1) {
    //             return {name:categorie}
    //         }  
    //     })
    //     const cleanedSubcategotiesArray = subcategoriesBuilt.filter(categorie => categorie !== undefined)
    //     cleanedSubcategotiesArray.push({name:'clothing',clothing:subcategorie});
    //     setCategories(cleanedSubcategotiesArray)
    // }

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