import { ToDoContext } from '../contexts/toDoContext'
import { useContext } from 'react'

export const useToDoContext = () => {
  const context = useContext(ToDoContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}