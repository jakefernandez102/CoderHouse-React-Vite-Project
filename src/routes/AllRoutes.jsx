
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import App from '../App';
import Layout from '../components/Layout';
import ProductItem from '../pages/ProductItem';
import ErrorPage from '../pages/ErrorPage';
import Bill from '../pages/Bill';
import UserSettings from '../components/UserSettings';

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
                path:'/:categoryId',
                element:<Layout/>,
                errorElement:<ErrorPage/>,
            },
            {
                path:'/product-item/:id',
                element:<ProductItem />,
                errorElement:<ErrorPage/>,
            },
            {
                path:'/bill/:orderId',
                element:<Bill />,
                errorElement:<ErrorPage/>,
            },
            {
                path:'/user-settings/:userId',
                element:<UserSettings />,
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