/* eslint-disable react/prop-types */

import { useEffect } from "react";
import CategoryItem from "./CategoryItem";
import useStore from "../hooks/useStore";
import { getCategoriesFS } from "../data/firebase.js";

const Categories = ({categories}) => {

    const {setCategories}=useStore()

    useEffect(()=>{

        const getCategories = async () =>{
            try {
                const data= await getCategoriesFS();
                buildSubcategorie(data)

            } catch (error) {
                console.log(error)
            }
        }
        getCategories();

    },[])

    const buildSubcategorie = (categories) =>{
        let subcategorie=[];
        const subcategoriesBuilt = categories.map(category => {
            
            if(category.split(' ')[1] === 'clothing'){
                subcategorie.push({name:category})
            }
            if(category.split(' ').length === 1) {
                return {name:category}
            }  
        })
        const cleanedSubcategotiesArray = subcategoriesBuilt.filter(categorie => categorie !== undefined)
        cleanedSubcategotiesArray.push({name:'clothing',clothing:subcategorie});
        setCategories(cleanedSubcategotiesArray)
    }

    return (
        <ul className='flex flex-col gap-2'>
            {categories.map(category => (
                <CategoryItem key={category.name} category={category} />
            ))}
        </ul>

    )
}

export default Categories