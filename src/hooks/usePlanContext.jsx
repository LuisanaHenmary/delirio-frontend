import { useContext } from 'react'
import { PlanContext } from '../contexts/planContext' 

export const usePlanContext = () => {
  const context = useContext(PlanContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}