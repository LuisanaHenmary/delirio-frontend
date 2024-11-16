import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './contexts/authContext.jsx'
import { StatusContextProvider } from './contexts/statusContext.jsx'
import { ToDoContextProvider } from './contexts/toDoContext.jsx'
import { JobContextProvider } from './contexts/jobsContext'
import { ProjectsContextProvider } from './contexts/projectsContext'
import { EmployersContextProvider } from './contexts/employersContext'
import { CompaniesContextProvider } from './contexts/companiesContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <StatusContextProvider>
        <JobContextProvider>
          <ProjectsContextProvider>
            <EmployersContextProvider>
              <CompaniesContextProvider>
                <ToDoContextProvider>
                  <App />
                </ToDoContextProvider>
              </CompaniesContextProvider>
            </EmployersContextProvider>
          </ProjectsContextProvider>
        </JobContextProvider>
      </StatusContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
