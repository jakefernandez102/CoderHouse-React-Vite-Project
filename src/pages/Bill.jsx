import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLastOrder } from "../data/firebase";
import Summary from "../components/Summary";
import { formatMoney } from "../helpers/formatMoney";
import { calculateFee, calculateSubTotal, calculateTaxes, calculateTotal } from "../helpers/calculateOperations";

let subTotal = 0
let taxes = 0
let fee = 0
let grandTotal = 0
const Bill = () => {

    const [orders,setOrders]=useState([])
    
   

    const {orderId}=useParams()
    useEffect(()=>{
      const loadOrders =async ()=>{
        const ordersBS =  await getLastOrder(orderId)
        localStorage.setItem('orders',JSON.stringify(ordersBS))

        setOrders(JSON.parse(localStorage.getItem('orders')))
      }
      loadOrders()
    },[])

  return (
    <>
            <h1 className='text-center p-7 font-black text-sky-900 text-5xl'>Summary</h1>
        <div className='flex items-center justify-center mt-10'>
            <ul  className='flex flex-col gap-3 w-3/4'>
              {
                orders.map(order=>{
                  subTotal=0
                  return(
                    order?.order?.map(_order=>{
                    if(order.id === orderId.split('-')[1]){
                      
                      subTotal = calculateSubTotal(subTotal,parseInt(_order?.price),parseInt(_order?.quantity))
                      taxes = calculateTaxes(subTotal)
                      fee = calculateFee(subTotal)  
                      grandTotal = calculateTotal(taxes,fee,subTotal)
                      return (
                        <Summary key={_order.id} order={_order} />
                        )
                    }
                    })
                )})
              }
              
              
            </ul>
        </div>
        <div className='m-10'>
          <h2 className='text-center p-7 font-black text-sky-900 text-5xl'>Your Bill</h2>
          <div className='container bg-white shadow-lg p-10 flex flex-col gap-8'>
            <div className='grid grid-cols-2 items-center place-items-center'>
              <h3 className='font-bold text-xl'>Subtotal:</h3>
              <p className='text-2xl font-black text-sky-800'>{formatMoney(subTotal)}</p>
            </div>
            <div className='grid grid-cols-2 items-center place-items-center'>
              <h3 className='font-bold text-xl'>Taxes:</h3>
              <p className='text-2xl font-black text-sky-800'>{formatMoney(taxes)} (12%)</p>
            </div>
            <div className='grid grid-cols-2 items-center place-items-center'>
              <h3 className='font-bold text-xl'>Fee:</h3>
              <p className='text-2xl font-black text-sky-800'>{formatMoney(fee)} (5%)</p>
            </div>
            <div className='grid grid-cols-2 items-center place-items-center border-2 border-sky-950 py-5'>
              <h3 className='font-bold text-xl'>Grand Total:</h3>
              <p className='text-2xl font-black text-sky-800'>{formatMoney(grandTotal)}</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default Bill