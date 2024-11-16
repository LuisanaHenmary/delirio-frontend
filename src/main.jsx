import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './contexts/authContext.jsx'
import { StatusContextProvider } from './contexts/statusContext.jsx'
import { ToDoContextProvider } from './contexts/toDoContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <StatusContextProvider>
        <ToDoContextProvider>
          <App />
        </ToDoContextProvider>
      </StatusContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
