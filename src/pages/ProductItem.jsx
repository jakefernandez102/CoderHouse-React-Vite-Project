/* eslint-disable react/prop-types */

import { Rate } from "antd";
import { formatMoney } from "../helpers/formatMoney";
import useStore from "../hooks/useStore";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProductItem = () => {
    const [quantity,setQuantity] = useState(1)
    const {product,handleSetCar,handleDecreaseQuantity,handleIncreaseQuantity} = useStore()
    const {category,description, id, image, price,rating,title} = product;

    const handleClick = ()=>{
        const productCar = {id,title,description,image,price,category,quantity}
        handleSetCar(productCar)
    }

    const handleIncreaseButtom = ()=>{
        setQuantity(quantity+1)

    }
    const handleDecreaseButtom = ()=>{
        if(quantity === 1)return
        setQuantity(quantity-1)
    }

    return (
    <div className='flex flex-col lg:flex lg:flex-row sm:p-10   items-center   gap-5'>
        <div className='flex items-center justify-center bg-white shadow-lg p-10 cursor-pointer rounded-lg w-full h-full  md:w-1/2 md:h-1/2'>
            <div className=' flex items-center justify-center '>
                <div>
                    <img className='block mx-auto' src={product.image} alt={`${title} image`} height={300} width={300} />
                </div>
            </div>
        </div>
        <div className='flex flex-col justify-between items-center border-2 border-gray-400 w-full h-full  md:w-1/2 md:h-1/2'>
            <div className='p-10 '>
                <h2 className='boder border-b uppercase font-bold my-5 text-sm'>{product.title}</h2>
            </div>
            <div className='p-10 border-t-2 border-black'>
                <p className=' text-gray-500 text-xs'>{product.description}</p>
            </div>
            <div className='flex justify-between border-t-2 border-black w-full px-10'>
                <p className='font-bold text-xl'>{formatMoney(product.price)}</p>
                <p className='italic text-gray-400 font-bold  text-sm'>{product.category}</p>
            </div>
            <div className='flex justify-center'>
                <Rate disabled allowHalf defaultValue={rating.rate} />
            </div>
            <div className='flex gap-2 items-center'>
                <button type='button' className={quantity===1?'flex items-center bg-gray-400 rounded-lg shadow px-3':'flex items-center bg-white rounded-lg shadow px-3'} onClick={handleDecreaseButtom } disabled={product.quantity === 1 ? true :''}>-</button>
                <p>{quantity}</p>
                <button type='button' className='bg-white rounded-lg shadow px-3' onClick={handleIncreaseButtom}>+</button>
            </div>
            <div className='flex gap-5 justify-center px-10 pb-5 '>
                <button
                    type='button'
                    className='text-sm shadow-lg mt-5 bg-cyan-200 px-5 py-3 rounded-lg font-bold uppercase hover:bg-cyan-400 transition-colors'
                    onClick={handleClick}
                    >
                    Add to car
                </button>
                <Link
                    to='/'
                    type='button'
                    className='text-sm shadow-lg mt-5 bg-gray-200 px-5 py-3 rounded-lg font-bold uppercase hover:bg-gray-400 transition-colors'
                    
                    >
                    Go back
                </Link>
            </div>
        </div>
    </div>
    )
}

export default ProductItem