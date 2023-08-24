import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { StoreProvider } from './context/StoreProvider.jsx';
import AllRoutes from './routes/AllRoutes.jsx';
import { AuthProvider } from './context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(

    <AuthProvider>
      <StoreProvider>
        <AllRoutes/>
      </StoreProvider>
    </AuthProvider>
  
)
