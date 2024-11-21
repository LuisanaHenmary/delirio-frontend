import { useAuthContext } from './useAuthContext'
import { useStatusContext } from './useStatusContext'
import { useJobContext } from './useJobContext'
import { useToDoContext } from './useToDoContext'
import { useProjectsContext } from './useProjectsContexr'
import { useEmployersContext } from './useEmployersContext'
import { useCompaniesContext } from './useCompanyContext'

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
  const { dispatchProjects } = useProjectsContext()

  const clearLists = () => {

    dispatch({ type: 'SET_TO_DOES', payload: [] })
    dispatchEmployers({ type: 'SET_EMPLOYERS', payload: [] })
    dispatchCompanies({ type: 'SET_COMPANIES', payload: [] })
    dispatchStatus({ type: 'SET_STATUS', payload: [] })
    dispatchJob({ type: 'SET_JOBS', payload: [] })
    dispatchProjects({ type: 'SET_PROJECTS', payload: [] })
  }

  return { clearLists }
}