import { createContext, useReducer } from 'react'

export const CompaniesContext = createContext()

export const companiesReducer = (state, action) => {

  switch (action.type) {

    case 'SET_COMPANIES':
      return {
        companies: action.payload
      }

    default:
      return state
  }
}

export const CompaniesContextProvider = ({ children }) => {
  const [state, dispatchCompanies] = useReducer(companiesReducer, {
    companies: []
  })

  return (
    <CompaniesContext.Provider value={{ ...state, dispatchCompanies }}>
      {children}
    </CompaniesContext.Provider>
  )
}