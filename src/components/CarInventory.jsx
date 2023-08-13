/* eslint-disable react/prop-types */

const CarInventory = ({product}) => {
    const {name,price,quantity,image} =product;
  return (
    <div className='absolute right-3 top-16 bg-slate-200 p-5 shadow-lg'>
        <div className='flex gap-5 justify-between items-center'>
            <img src={image} alt={`${name} image`} width={60} />
            <p>{name}</p>
            <p>{price}</p>
            <div className='flex gap-2'>
                <p>-</p>
                <p>{quantity}</p>
                <p>+</p>
            </div>
            <button className='rounded-lg bg-red-600 text-white font-bold uppercase px-2 py-3 hover:bg-red-700'>Delete</button>
            <button className='rounded-lg bg-green-600 text-white font-bold uppercase px-2 py-3 hover:bg-green-700'>buy</button>
        </div>
    </div>
  )
}

export default CarInventory