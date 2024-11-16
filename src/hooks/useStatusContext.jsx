import { useContext } from 'react'
import { StatusContext } from '../contexts/statusContext'

export const useStatusContext = () => {
  const context = useContext(StatusContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}