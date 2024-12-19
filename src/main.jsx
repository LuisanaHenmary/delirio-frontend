import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './contexts/authContext.jsx'
import { StatusContextProvider } from './contexts/statusContext.jsx'
import { ToDoContextProvider } from './contexts/toDoContext.jsx'
import { JobContextProvider } from './contexts/jobsContext'
import { EmployersContextProvider } from './contexts/employersContext'
import { CompaniesContextProvider } from './contexts/companiesContext'
import { ToDoTypeContextProvider } from './contexts/toDoTypeContext.jsx'
import { PlanContextProvider } from './contexts/planContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <StatusContextProvider>
        <JobContextProvider>
          <ToDoTypeContextProvider>
            <PlanContextProvider>
              <EmployersContextProvider>
                <CompaniesContextProvider>
                  <ToDoContextProvider>
                    <App />
                  </ToDoContextProvider>
                </CompaniesContextProvider>
              </EmployersContextProvider>
            </PlanContextProvider>
          </ToDoTypeContextProvider>
        </JobContextProvider>
      </StatusContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
