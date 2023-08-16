import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { StoreProvider } from './context/StoreProvider.jsx';
import AllRoutes from './routes/AllRoutes.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <StoreProvider>
      <AllRoutes/>
    </StoreProvider>
  
)
