/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

const StoreContext = createContext()

const StoreProvider = ({children}) =>{

    const [category,setCategory] = useState('jewelery')
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})

    useEffect(()=>{
        const getProducts = async ()=>{
            const {data} = await axios.get(`${import.meta.env.VITE_API_PRODUCTS_URL}`)
            setProducts(data)
        }
        getProducts()
    },[])

    useEffect(()=>{
        const getProductsByCategory = async ()=>{
            const {data} = await axios.get(`${import.meta.env.VITE_API_PRODUCTS_URL}/category/${category}`)
            setProducts(data)
        }
        getProductsByCategory()
        

    },[category])

    const handleSetCategory = (category)=>{
        setCategory(category)
    }

    const handleSetProduct = (product)=>{
        setProduct(product)
    }

    return(
        <StoreContext.Provider
            value={{
                category,
                handleSetCategory,
                products,
                handleSetProduct,
                product
                
            }}
        >
            {children}
        </StoreContext.Provider>
    )
}

export {
    StoreProvider
}
export default StoreContext;
