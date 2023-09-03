/* eslint-disable react/prop-types */
import { formatMoney } from '../helpers/formatMoney.js';

const Summary = ({order}) => {
    

    return (
            <li className='flex justify-between items-center p-5 gap-5 border border-b-2 border-b-black shadow-lg bg-sky-100 rounded-l-3xl'>
                <div className='w-1/6'>
                    <img src={order.image} alt="" />
                </div>
                <div className='w-1/2 font-bold'>
                    <p>{order.title}</p>
                </div>
                <div className='text-xl font-bold'>
                    <p>{formatMoney(parseInt(order.price))}</p>
                </div>
                <div className='font-bold p-5'>
                    <p>{order.quantity}</p>
                </div>
            </li>
  )
}

export default Summary