import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserIdProvider } from './components/contexts/UserIdContext.jsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      100: 'rgba(245, 230, 225, 0.9)',  // Claro, leve e translúcido
      200: 'rgb(224, 213, 209)',        // Claro
      300: 'rgb(201, 183, 166)',        // Médio-claro
      400: 'rgb(179, 154, 138)',        // Médio
      500: 'rgba(127, 92, 57, 0.9)',    // Principal
      600: 'rgb(130, 98, 65)',          // Escuro
      700: 'rgb(97, 75, 64)',           // Mais escuro
      800: 'rgb(71, 53, 45)',           // Aprofundado
      900: 'rgb(44, 33, 25)',           // Mais profundo
    },
  }})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <UserIdProvider>
        <App />
      </UserIdProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
