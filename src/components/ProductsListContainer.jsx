/* eslint-disable react/prop-types */

import { useParams } from "react-router-dom";
import useStore from "../hooks/useStore";
import Product from "./Product";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { getCategory, getProducts } from "../data/firebase";

const ProdusctsListDisplay = () => {

    const [products,setProducts] = useState([])
    const {category,handleSetProduct,loadingData,setLoadingData,setCategory} = useStore()
    const {categoryId} = useParams()
    
    useEffect( ()=>{
    
        const shootGetProducts = async ()=>{
        setProducts(await getProducts())
        }

        const loadDataPromise = new Promise(resolve => {
            setTimeout(() => {
                resolve('Promise resolved, data loaded...')
                setLoadingData(false)
                shootGetProducts()
            }, 500);
        })
    
        loadDataPromise.then(resolve => console.log(resolve))
                    .catch(err => console.log(err))
    },[])

    useEffect(()=>{

        const getProductsByCategory = async ()=>{
            setProducts([])
            setProducts(await getCategory(categoryId))
        }

        if(category === ''){
            return
        } else if(category === 'clothing'){
            setCategory("men's clothing")
        }

        const loadDataPromise = new Promise(resolve => {
            setLoadingData(true)
            setTimeout(() => {
                resolve('Promise resolved, data loaded...')
                setLoadingData(false)
                getProductsByCategory()
            }, 1000);
        })
        loadDataPromise.then(resolve => (resolve))
                    .catch(err => console.log(err))
    },[categoryId])


    const handleClick = (product)=>{
        handleSetProduct(product)
    }
    
    return (
        <>
        <h1
            className='font-bold uppercase text-4xl py-10'
        >{categoryId}</h1>
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
                                            <div
                                                key={product.id}
                                                className='bg-white p-10 cursor-pointer rounded-lg'
                                                onClick={()=>{
                                                    handleClick(product)
                                                }}
                                            >
                                                <Product product={product}/>
                                            </div>
                                        )
                                ))
                        }
                </div>
        }
    </>
  )
}

export default ProdusctsListDisplay