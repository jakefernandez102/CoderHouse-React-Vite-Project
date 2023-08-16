
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import App from '../App';
import Layout from '../components/Layout';
import ProductItem from '../pages/ProductItem';

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                index:true,
                element:<Layout/>
            },
            {
                path:'/product-item/:id',
                element:<ProductItem />
            },
        ]
        
    }
])

const AllRoutes = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default AllRoutes