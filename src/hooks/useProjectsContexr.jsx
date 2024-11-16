import { ProjectsContext } from '../contexts/projectsContext'
import { useContext } from 'react'

export const useProjectsContext = () => {
  const context = useContext(ProjectsContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}