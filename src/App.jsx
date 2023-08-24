
import { useParams } from 'react-router-dom';
import CarWidget from './components/CarWidget';
import Layout from './components/Layout';
import ProdusctsListDisplay from './components/ProductsListContainer';
import ProductItem from './pages/ProductItem';


function App() {
  
  const {id} = useParams()

  return (
    <>
      <Layout>
        <CarWidget/>

        {
          id  ? <ProductItem/>
              : <ProdusctsListDisplay/>
        }
      </Layout>
    </>
  )
}

export default App
