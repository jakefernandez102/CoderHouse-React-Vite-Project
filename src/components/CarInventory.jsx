/* eslint-disable react/prop-types */
import { formatMoney } from '../helpers/formatMoney';



const CarInventory = ({car}) => {

  return (
    
    <div 
    className='absolute right-3 top-16 bg-slate-200 p-5 shadow-lg '>
          {car.map(item => (
        
        <div
          key={item.id}
          className='w-full flex gap-5 justify-between items-center border border-b-black p-10'>
            <img className='rounded-lg' src={item.images[0]} alt={`${item.title} image`} width={60} />
            <p>{item.title}</p>
            <p>{formatMoney(item.price)}</p>
            <div className='flex gap-2'>
                <p>-</p>
                <p>1</p>
                <p>+</p>
            </div>
            <button className='rounded-lg bg-red-600 text-white font-bold uppercase px-2 py-3 hover:bg-red-700'>Delete</button>
            <button className='rounded-lg bg-green-600 text-white font-bold uppercase px-2 py-3 hover:bg-green-700'>buy</button>
        </div>
        ))}
    </div>
  )
}

export default CarInventory