import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { UserProvider } from './context/UserContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { TodoProvider } from './context/TodoContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
        <Toaster />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
