/* eslint-disable valid-typeof */

import { calculateFee, calculateSubTotal, calculateTaxes, calculateTotal } from '../helpers/calculateOperations.js';
import { formatMoney } from '../helpers/formatMoney.js';

let subTotal = 0
let taxes = 0
let fee = 0
let grandTotal = 0
const OrdersHistory = () => {
  
  const userLS= typeof window !== undefined ? JSON.parse(localStorage.getItem('userLogged')) ?? [] : []
  
  console.log(userLS)
  
  return (
    <div className='w-full flex flex-col items-center mt-10'>
      <h1>Orders History</h1>

      <div className=''>
        {
          userLS?.orders.map(order =>{
            subTotal = 0;
            taxes = 0;
            fee = 0;
            grandTotal = 0;
            return(
            <div key={order.id}>
              <div className='border-2 border-b-black w-2/3 p-5' >
                <div className='flex gap-3 items-center'>
                  <h2 className='p-3'>Order Id: </h2>
                  <p className='font-bold  underline'>{order.id}</p>
                </div>
                <div className='bg-slate-400 p-3 rounded-t-xl flex items-center gap-3'>
                  <h3 className='font-bold text-lg'>Order Date:</h3>
                  <p className='text-sm italic'>{order.createdAt}</p>
                </div>
                  <ul className='border-2 border-b-gray-400 shadow-lg' >
                  {
                    order?.order?.map(_order =>{
                      
                        
                        subTotal = calculateSubTotal(subTotal,parseInt(_order?.price),parseInt(_order?.quantity))
                        taxes = calculateTaxes(subTotal)
                        fee = calculateFee(subTotal)  
                        grandTotal = calculateTotal(taxes,fee,subTotal)
                      
                      return(
                        <div key={_order?.id}>
                          <li className='bg-slate-100  border-2 border-b-gray-400 flex justify-between items-center p-5' >
                            <div>
                              <img src={_order.image} width={100} alt="" />
                            </div>
                            <div className='w-1/2'>
                              <p>{_order.title}</p>
                            </div>
                            <div>
                              <p>{formatMoney(parseInt(_order.price))}</p>
                            </div>
                            <div>
                              <p>{_order.quantity}</p>
                            </div>
                          </li>
                        </div>
                      )})
                  }
                </ul>
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
              </div>
            </div>
          )})
        }
      </div>
    </div>
  )
}

export default OrdersHistory