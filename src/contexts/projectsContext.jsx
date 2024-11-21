import { createContext, useReducer } from 'react'

export const ProjectsContext = createContext()

export const projectsReducer = (state, action) => {

  switch (action.type) {

    case 'SET_PROJECTS':
      return {
        projects: action.payload
      }
    case 'CREATE_PROJECT':
      return {
        projects: [...state.projects, action.payload]
      }
    default:
      return state
  }
}

export const ProjectsContextProvider = ({ children }) => {
  const [state, dispatchProjects] = useReducer(projectsReducer, {
    projects: []
  })

  return (
    <ProjectsContext.Provider value={{ ...state, dispatchProjects }}>
      {children}
    </ProjectsContext.Provider>
  )
}