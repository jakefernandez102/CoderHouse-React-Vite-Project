
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import App from '../App';
import Layout from '../components/Layout';
import ProductItem from '../pages/ProductItem';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                index:true,
                element:<Layout/>,
                errorElement:<ErrorPage/>,
            },
            {
                path:'/product-item/:id',
                element:<ProductItem />,
                errorElement:<ErrorPage/>,
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