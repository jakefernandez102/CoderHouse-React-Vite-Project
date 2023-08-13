/* eslint-disable react/prop-types */

import { useState } from "react";
import Categories from "./Categories";
import CollapseCategoryButton from "./CollapseCategoryButton";
import useStore from '../hooks/useStore';

const CategoryItem = ({category}) => {
    const [isCollapsed,setIsCollapsed] = useState(true);
    const {handleSetCategory} = useStore();
    const handleClick = (e)=>{
        e.stopPropagation();
        console.log(category);
        handleSetCategory(category.name)
    }
    return (
        <>
            <div
                className={category.name === 'clothing'?'flex items-center gap-2 rounded-lg transition-all  hover:shadow-md  cursor-pointer':'flex items-center gap-2 rounded-lg transition-all hover:shadow-md hover:bg-slate-400 hover:text-white cursor-pointer'}
                onClick={handleClick}
                >
                <img 
                    src={category.name === 'electronics' 
                    ? `/img/electronics.avif` 
                    : category.name === 'jewelery' 
                    ? '/img/jewerly.avif' 
                    : category.name === "men's clothing" 
                            ? '/img/mens-clothing.avif' 
                            : category.name === 'clothing' 
                            ? '/img/clothing.avif'
                            : category.name === "women's clothing" 
                            ? '/img/womens-clothing.avif': ''}
                            width={100}
                            height={100}
                            className='rounded-lg'
                            />
                
                <li className='uppercase font-bold'>
                    <span>{category.name === 'clothing' ?  <CollapseCategoryButton isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} /> : category.name}</span>
                    {category?.clothing && !isCollapsed && (
                        <Categories categories={category?.clothing}/>

                    )}
                </li>
            </div>

        </>
    )
}

export default CategoryItem