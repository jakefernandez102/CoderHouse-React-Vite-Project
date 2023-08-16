/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import useStore from "../hooks/useStore";
import Product from "./Product";
import Spinner from "./Spinner";

const ProdusctsDisplay = ({products}) => {

    const {category,handleSetProduct,loadingData} = useStore()

    const handleClick = (product)=>{
        handleSetProduct(product)
    }

    return (
        <>
        <h1
            className='font-bold uppercase text-4xl py-10'
        >{category}</h1>
        {
        loadingData 
            ?   
                <div className='flex justify-center items-center w-full h-[85%] mx-auto'>
                    <Spinner/>
                </div>
            :
                <div
                        className='grid sm:grid-cols-2 xl:grid-cols-3 gap-2  p-2'
                >
                        {
                                products.map(product=> (                        

                                        (
                                            <Link
                                                to={`/product-item/${product.id}`}
                                                key={product.id}
                                                className='bg-white p-10 cursor-pointer rounded-lg'
                                                onClick={()=>{
                                                    handleClick(product)
                                                }}
                                            >
                                                <Product product={product}/>
                                            </Link>
                                        )
                                ))
                        }
                </div>
        }
    </>
  )
}

export default ProdusctsDisplay