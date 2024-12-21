import { useContext } from 'react'
import { ToDoTypeContext } from '../contexts/toDoTypeContext' 

export const useToDoTypeContext = () => {
  const context = useContext(ToDoTypeContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}