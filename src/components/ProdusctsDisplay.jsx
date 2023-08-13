/* eslint-disable react/prop-types */

import useStore from "../hooks/useStore";
import Product from "./Product";

const ProdusctsDisplay = ({products}) => {

    const {category,handleSetProduct} = useStore()

    const handleClick = (product)=>{
        handleSetProduct(product)
    }

    return (
        <>
        <h1
            className='font-bold uppercase text-4xl py-10'
        >{category}</h1>
        <div
             className='grid sm:grid-cols-2 xl:grid-cols-3 gap-2  p-2'
        >
                {
                    products.map(product=> {
                        

                        return (
                        <div key={product.id}
                            className='bg-white p-10 cursor-pointer rounded-lg'
                            onClick={()=>handleClick(product)}
                        >
                            <Product product={product}/>
                        </div>
                        )
                    })
                }
        </div>
    </>
  )
}

export default ProdusctsDisplay