import ReactDOM from 'react-dom/client'

import './index.css'
import { StoreProvider } from './context/StoreProvider.jsx';
import { AuthProvider } from './context/AuthProvider';
import './data/firebase'
import App from './App';
ReactDOM.createRoot(document.getElementById('root')).render(

    <AuthProvider>
      <StoreProvider>
        <App/>
      </StoreProvider>
    </AuthProvider>
  
)
