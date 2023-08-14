/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

const StoreContext = createContext()

const StoreProvider = ({children}) =>{
    
    const [categories,setCategories] = useState([])
    const [category,setCategory] = useState("")
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
            const {data} = await axios.get(`${import.meta.env.VITE_API_PRODUCTS_URL}/category/${category}`)
            // const {data} = await axios.get(`https://api.escuelajs.co/api/v1/products`)
            setProducts(data)
        }
        if(category === ''){
            return
        } else {
            getProductsByCategory()
        }
            
        

    },[category])


    useEffect(()=>{

        const getCategories = async () =>{
            try {
                const {data} = await axios.get(`${import.meta.env.VITE_API_PRODUCTS_URL}/categories`)
                // const {data} = await axios.get(`https://api.escuelajs.co/api/v1/categories`)
                
                buildSubcategorie(data)
                // setCategories(data)
            } catch (error) {
                console.log(error)
            }
        }
        getCategories();

    },[])
    
    const buildSubcategorie = (categories) =>{
        let subcategorie=[];
        const subcategoriesBuilt = categories.map(category => {
            
            if(category.split(' ')[1] === 'clothing'){
                subcategorie.push({name:category})
            }
            if(category.split(' ').length === 1) {
                return {name:category}
            }  
        })
        const cleanedSubcategotiesArray = subcategoriesBuilt.filter(categorie => categorie !== undefined)
        cleanedSubcategotiesArray.push({name:'clothing',clothing:subcategorie});
        setCategories(cleanedSubcategotiesArray)
    }

    const handleSetCategory = (category)=>{
        setCategory(category)
    }

    const handleSetProduct = (product)=>{
        setProduct(product)
    }

    const handleSetCar = (product)=>{

        if(car?.some(item => item?.id === product.id)){
            const productSelected = car?.filter(item => item?.id === product?.id);
            
            const updatedCar = car.map(item => {
                if(item.id === product.id){
                    item.quantity = productSelected[0].quantity +1;
                }
                return item
            })

            setCar([...updatedCar])
            return
        }else{
            setCar(carState => [...carState,product])
        }
    }

    const increaseDecreaseProductQuantityInCar = (product,action) =>{
        switch (action) {
            case 'increase':
                increaseProductQuantityInCar(product)
                break;
            case 'decrease':
                decreaseProductQuantityInCar(product)
                break;
        
            default:
                break;
        }
    }
    const increaseProductQuantityInCar = (product)=>{
        const selectedProduct = car.filter(item => item.id === product.id) 
        const updatedCar = car.map(item => {
            if(item.id === product.id){
                item.quantity = selectedProduct[0].quantity +1
                
            }
            return item
        })
        setCar([...updatedCar])
    }
    const decreaseProductQuantityInCar = (product)=>{
        const selectedProduct = car.filter(item => item.id === product.id) 
        
        const updatedCar = car.map(item => {
            if(item.id === product.id){
                item.quantity = selectedProduct[0].quantity -1
            }
            return item
        })
        setCar([...updatedCar])
    }

    const deleteItemFromCar = (item) => {
        const selectedItem = car.filter(_item => _item.id !== item.id)
        setCar([...selectedItem])
    }

    return(
        <StoreContext.Provider
            value={{
                categories,
                category,
                handleSetCategory,
                products,
                handleSetProduct,
                product,
                handleSetCar,
                car,
                increaseDecreaseProductQuantityInCar,
                deleteItemFromCar
                
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
