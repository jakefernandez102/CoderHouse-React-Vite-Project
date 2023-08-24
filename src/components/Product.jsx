/* eslint-disable react/prop-types */

import { useState } from 'react';
import { formatMoney } from '../helpers/formatMoney.js';
import useStore from '../hooks/useStore.jsx';
import { Rate } from 'antd';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Product = ({product}) => {

    const {category,description, id, image, price,rating,title} = product;

    const [quantity, setQuantity] =useState(1)
    

    
    return (
    <div className=' flex flex-col items-center justify-between h-full'>
        <div>
            <h2 className='boder border-b uppercase font-bold my-5'>{title}</h2>
        </div>
        <div className='text-ellipsis overflow-hidden ...'>
            <p className='product-description text-gray-500 text-sm'>{description}</p>
        </div>
        <div>
            <img className='block mx-auto' src={image} alt={`${title} image`} height={150} width={150} />
        </div>
        <div className='flex justify-between w-full'>
            <p className='font-bold text-xl'>{formatMoney(price)}</p>
            <div>
                <Rate disabled allowHalf defaultValue={rating.rate} />
            </div>
            <p className='italic text-gray-400 font-bold  text-sm'>{category}</p>
        </div>
        <div>
            <Link
                to={`/product-item/${id}`}
                className='mt-5 bg-cyan-200 px-5 py-3 rounded-lg font-bold uppercase hover:bg-cyan-400 transition-colors'
            >
                View Product
            </Link>
        </div>
    </div>
    )
}

export default Product