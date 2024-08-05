import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserIdProvider } from './components/contexts/UserIdContext.jsx'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <UserIdProvider>
        <App />
      </UserIdProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
