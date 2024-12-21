import { useAuthContext } from './useAuthContext'
import { useStatusContext } from './useStatusContext'
import { useJobContext } from './useJobContext'
import { useToDoContext } from './useToDoContext'
import { usePlanContext } from './usePlanContext' 
import { useEmployersContext } from './useEmployersContext'
import { useCompaniesContext } from './useCompanyContext'
import { useToDoTypeContext } from './useToDoTypeContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }

  return { logout }
}

export const useClear = () => {

  const { dispatch } = useToDoContext()
  const { dispatchEmployers } = useEmployersContext()
  const { dispatchCompanies } = useCompaniesContext()
  const { dispatchStatus } = useStatusContext()
  const { dispatchJob } = useJobContext()
  const { dispatchPlan } = usePlanContext()
  const { dispatchTypes } = useToDoTypeContext()

  const clearLists = () => {

    dispatch({ type: 'SET_TO_DOES', payload: [] })
    dispatchEmployers({ type: 'SET_EMPLOYERS', payload: [] })
    dispatchCompanies({ type: 'SET_COMPANIES', payload: [] })
    dispatchStatus({ type: 'SET_STATUS', payload: [] })
    dispatchJob({ type: 'SET_JOBS', payload: [] })
    dispatchPlan({ type: 'SET_PLANS', payload: [] })
    dispatchTypes({ type: 'SET_TO_DO_TYPES', payload: [] })
  }

  return { clearLists }
}