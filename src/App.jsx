
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CarWidget from './components/CarWidget';
import Layout from './components/Layout';
import ProdusctsListDisplay from './components/ProductsListContainer';
import ProductItem from './pages/ProductItem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Bill from './pages/Bill';
import UserSettings from './components/UserSettings';
import OrdersHistory from './components/OrdersHistory';


function App() {
  
  return (
    <>
        <BrowserRouter>
          <CarWidget/>
          <Layout>
          <Routes>
              <Route exact path='/' element={<ProdusctsListDisplay/>} />
              <Route exact path='/:categoryId' element={<ProdusctsListDisplay />} />
              <Route exact path='/product-item/:id' element={<ProductItem />} />
              <Route exact path='/bill/:orderId' element={<Bill />} />
              <Route exact path='/user-settings/:userId' element={<UserSettings />} />
              <Route exact path='/orders-history/:ordersUserId' element={<OrdersHistory />} />
          </Routes>
          </Layout>
        </BrowserRouter>

        <ToastContainer/>
    </>
  )
}

export default App
