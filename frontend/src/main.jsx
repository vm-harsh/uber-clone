import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import UserProvider from './context/UserProvider.jsx'
import CaptainProvider from './context/CaptainProvider.jsx'
import StatusProvider from './context/StatusProvider.jsx'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <StatusProvider>
      <UserProvider>
        <CaptainProvider>
          <App />
        </CaptainProvider>
      </UserProvider>
    </StatusProvider>
    </BrowserRouter>
)
