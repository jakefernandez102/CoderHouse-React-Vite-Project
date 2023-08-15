/* eslint-disable react/prop-types */
import { formatMoney } from '../helpers/formatMoney';
import useStore from '../hooks/useStore';



const CarInventory = ({car}) => {

  const {increaseDecreaseProductQuantityInCar,deleteItemFromCar}=useStore()

  const handleDecreaseQuantity = (product)=>{
  increaseDecreaseProductQuantityInCar(product,'decrease')
}

const handleIncreaseQuantity = (product)=>{
    increaseDecreaseProductQuantityInCar(product,'increase')
  }
  

  return (
    <>
    {
      car?.length !== 0 
      ?
      (<div 
      className='absolute right-3 top-16 bg-slate-100 p-5 shadow-lg z-50'>
            <h2 className='underline uppercase font-black '>Car List preview</h2>
            {car?.map(item => (
              <div
              key={item?.id}
              className='w-full flex gap-5 justify-between items-center border border-b-black p-10'>
              <img className='rounded-lg' src={item?.image} alt={`${item?.title} image`} width={60} />
              <p className='title-item w-1/3'>{item?.title}</p>
              <p>{formatMoney(item?.price)}</p>
              <div className='flex gap-2'>
                  <button type='button' className={item.quantity===1?'bg-gray-400 rounded-lg shadow px-3':'bg-white rounded-lg shadow px-3'} onClick={()=>handleDecreaseQuantity(item)} disabled={item.quantity === 1 ? 'true' :''}>-</button>
                  <p>{item?.quantity}</p>
                  <button type='button' className='bg-white rounded-lg shadow px-3' onClick={()=>handleIncreaseQuantity(item)}>+</button>
              </div>
              <button className='rounded-lg bg-red-600 text-white font-bold uppercase px-2 py-3 hover:bg-red-700' onClick={()=>deleteItemFromCar(item)}>Delete</button>
              <button className='rounded-lg bg-green-600 text-white font-bold uppercase px-2 py-3 hover:bg-green-700'>buy</button>
          </div>
          
          
          ))}
      </div>)
      :
      (
        <div 
      className='absolute right-3 top-16 bg-slate-100 p-5 shadow-lg '>
          <p>There are no Items in the car</p>
      </div>
      )
    }
    </>
  )
}

export default CarInventory