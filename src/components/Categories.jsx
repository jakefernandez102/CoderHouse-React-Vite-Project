/* eslint-disable react/prop-types */

import CategoryItem from "./CategoryItem";

const Categories = ({categories}) => {



    return (
        <ul className='flex flex-col gap-2'>
            {categories.map(category => (
                <CategoryItem key={category.name} category={category} />
            ))}
        </ul>
    )
}

export default Categories