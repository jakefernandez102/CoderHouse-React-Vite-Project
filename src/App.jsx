
import CarWidget from './components/CarWidget';
import Layout from './components/Layout';
import ProdusctsDisplay from './components/ProdusctsDisplay';
import useStore from './hooks/useStore';


function App() {


  const {products} = useStore()
  

  return (
    <>
      <Layout>
        <CarWidget/>

        <ProdusctsDisplay  products={products}/>
      </Layout>
    </>
  )
}

export default App
