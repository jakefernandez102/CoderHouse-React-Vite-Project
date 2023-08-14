
import { formatMoney } from '../helpers/formatMoney.js';
import useStore from '../hooks/useStore.jsx';
// eslint-disable-next-line react/prop-types
const Product = ({product}) => {

    const {category,description, id, images, price,rating,title} = product;
    const {handleSetCar,car} = useStore();

    const handleClick = ()=>{
        const productCar = {title,description,images,price,category}
        let updatedCar = []
        updatedCar = [...car,productCar]
        handleSetCar(updatedCar)
    }
    
    return (
    <div className=' flex flex-col items-center justify-between h-full'>
        <div>
            <h2 className='boder border-b uppercase font-bold my-5'>{title}</h2>
        </div>
        <div className='text-ellipsis overflow-hidden ...'>
            <p className='text-gray-500 text-sm'>{description}</p>
        </div>
        <div>
            <img className='block mx-auto' src={images[0]} alt={`${title} image`} height={150} width={150} />
        </div>
        <div className='flex justify-between w-full'>
            <p className='font-bold text-xl'>{formatMoney(price)}</p>
            <p className='italic text-gray-400 font-bold  text-sm'>{category.name}</p>
        </div>
        <div>
            <button
                type='button'
                className='mt-5 bg-cyan-200 px-5 py-3 rounded-lg font-bold uppercase hover:bg-cyan-400 transition-colors'
                onClick={handleClick}
            >
                Add to car
            </button>
        </div>
    </div>
    )
}

export default Product