/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import SignInModal from "../components/SignInModal";

const StoreContext = createContext()

const StoreProvider = ({children}) =>{
    
    const [categories,setCategories] = useState([])
    const [category,setCategory] = useState("")
    const [product, setProduct] = useState({})
    const [car,setCar] = useState([])

    const [loading, setLoading] = useState(false);
    const [openSignInModal, setOpenSignInModal] = useState(false);
    const [opeSignUpModal, setOpenSignUpModal] = useState(false);
    
    const [loadingData, setLoadingData] = useState(true);



    const onFinish = () => {
        handleOk()
    };


    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        setOpenSignInModal(false);
        }, 3000);
    };
    const handleCancel = () => {
        setOpenSignInModal(false);
    };
    

    const handleSignUpModal = () =>{
        if(SignInModal){
            setOpenSignInModal(!openSignInModal)
        }
        
        setTimeout(() => {
            setOpenSignUpModal(true)
        }, 100);
    };
    const handleSignInModal = () =>{
        if(SignInModal){
            setOpenSignUpModal(!opeSignUpModal)
        }
        
        setTimeout(() => {
            setOpenSignInModal(!openSignInModal)
        }, 100);
    };
    const onFinishSingUpModal = () => {
        handleOkSingUpModal()
    };


    const handleOkSingUpModal = () => {
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        setOpenSignUpModal(false);
        }, 3000);
    };

    const handleCancelSingUpModal = () => {
        setOpenSignUpModal(false);
    };
    
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
        const confirmed = confirm(`Do you really want to delete this item? ${item.name}`)
        if(confirmed){
            const selectedItem = car.filter(_item => _item.id !== item.id)
            setCar([...selectedItem])
        }
    }

    return(
        <StoreContext.Provider
            value={{
                setCategories,
                categories,
                setCategory,
                category,
                handleSetCategory,
                handleSetProduct,
                product,
                handleSetCar,
                car,
                setCar,
                increaseDecreaseProductQuantityInCar,
                deleteItemFromCar,
                onFinish,
                handleOk,
                handleCancel,
                handleSignUpModal,
                loading,
                setOpenSignInModal,
                openSignInModal,
                handleSignInModal,
                opeSignUpModal,
                onFinishSingUpModal,
                handleOkSingUpModal,
                handleCancelSingUpModal,
                loadingData,
                setLoadingData,

                
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
