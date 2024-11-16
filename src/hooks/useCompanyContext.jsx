import { useContext } from 'react'
import { CompaniesContext } from '../contexts/companiesContext'

export const useCompaniesContext = () => {
  const context = useContext(CompaniesContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}