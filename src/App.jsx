
import { useParams } from 'react-router-dom';
import CarWidget from './components/CarWidget';
import Layout from './components/Layout';
import ProdusctsListDisplay from './components/ProductsListContainer';
import ProductItem from './pages/ProductItem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Bill from './pages/Bill';

function App() {
  
  const {id,orderId} = useParams()
  return (
    <>
      <Layout>
        <CarWidget/>

        {
          id  ? <ProductItem/>
              : orderId ? <Bill/>
                        : <ProdusctsListDisplay/>
        }

        <ToastContainer/>
      </Layout>
    </>
  )
}

export default App
