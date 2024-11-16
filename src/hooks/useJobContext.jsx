import { useContext } from 'react'
import { JobContext } from '../contexts/jobsContext'

export const useJobContext = () => {
  const context = useContext(JobContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}