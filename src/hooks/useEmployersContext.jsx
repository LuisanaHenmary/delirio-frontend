import { useContext } from 'react'
import { EmployersContext } from '../contexts/employersContext'

export const useEmployersContext = () => {
  const context = useContext(EmployersContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}