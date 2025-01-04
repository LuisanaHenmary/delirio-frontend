import { createContext, useReducer } from 'react'

export const EmployersContext = createContext()

export const employersReducer = (state, action) => {

  switch (action.type) {

    case 'SET_EMPLOYERS':
      return {
        employers: action.payload
      }
      
    default:
      return state
  }
}

export const EmployersContextProvider = ({ children }) => {
  const [state, dispatchEmployers] = useReducer(employersReducer, {
    employers: []
  })

  return (
    <EmployersContext.Provider value={{ ...state, dispatchEmployers }}>
      {children}
    </EmployersContext.Provider>
  )
}