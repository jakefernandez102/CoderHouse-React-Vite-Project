/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

const StoreContext = createContext()

const StoreProvider = ({children}) =>{

    const [category,setCategory] = useState('jewelery')
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})
    const [car,setCar] = useState([])

    useEffect(()=>{
        const getProducts = async ()=>{
            const {data} = await axios.get(`${import.meta.env.VITE_API_PRODUCTS_URL}`)
            setProducts(data)
        }
        getProducts()
    },[])

    useEffect(()=>{
        const getProductsByCategory = async ()=>{
            // const {data} = await axios.get(`${import.meta.env.VITE_API_PRODUCTS_URL}/category/${category}`)
            const {data} = await axios.get(`https://api.escuelajs.co/api/v1/products`)
            const newData = data.filter(categoryProduct => categoryProduct.category.name === category)
            setProducts(newData)
        }
        getProductsByCategory()
        

    },[category])

    const handleSetCategory = (category)=>{
        setCategory(category)
    }

    const handleSetProduct = (product)=>{
        setProduct(product)
    }

    const handleSetCar = (product)=>{
        setCar(product)
    }

    return(
        <StoreContext.Provider
            value={{
                category,
                handleSetCategory,
                products,
                handleSetProduct,
                product,
                handleSetCar,
                car
                
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
