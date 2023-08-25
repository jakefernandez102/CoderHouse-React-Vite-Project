/* eslint-disable react/prop-types */

import { useParams } from "react-router-dom";
import useStore from "../hooks/useStore";
import Product from "./Product";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import axios from "axios";

const ProdusctsListDisplay = () => {

    const [products,setProducts] = useState([])
    const {category,handleSetProduct,loadingData,setLoadingData,setCategory} = useStore()
    const {categoryId} = useParams()
    useEffect(()=>{
    const getProducts = async ()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_PRODUCTS_URL}`)
        setProducts(data)
    }
    const loadDataPromise = new Promise(resolve => {
        setTimeout(() => {
            resolve('Promise resolved, data loaded...')
            setLoadingData(false)
            getProducts()
        }, 1000);
    })
    loadDataPromise.then(resolve => console.log(resolve))
                .catch(err => console.log(err))
    },[])

    useEffect(()=>{
        const getProductsByCategory = async ()=>{
            setProducts([])
            const {data} = await axios.get(`${import.meta.env.VITE_API_PRODUCTS_URL}/category/${categoryId}`)
            // const {data} = await axios.get(`https://api.escuelajs.co/api/v1/products`)
            setProducts(data)
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