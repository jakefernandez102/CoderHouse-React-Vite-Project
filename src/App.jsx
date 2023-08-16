
import { useParams } from 'react-router-dom';
import CarWidget from './components/CarWidget';
import Layout from './components/Layout';
import ProdusctsDisplay from './components/ProdusctsDisplay';
import useStore from './hooks/useStore';
import ProductItem from './components/ProductItem';


function App() {


  const {products,product} = useStore()
  
  const {id} = useParams()

  return (
    <>
      <Layout>
        <CarWidget/>

        {
          id  ? <ProductItem/>
              : <ProdusctsDisplay  products={products}/>
        }
      </Layout>
    </>
  )
}

export default App
