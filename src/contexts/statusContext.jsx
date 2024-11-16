import { createContext, useReducer } from 'react'

export const StatusContext = createContext()

export const statusReducer = (state, action) => {

  switch (action.type) {

    case 'SET_STATUS': 
      return {
        statues: action.payload
      }
    default:
      return state
  }
}

export const StatusContextProvider = ({ children }) => {
  const [state, dispatchStatus] = useReducer(statusReducer, {
    statues: []
  })

  return (
    <StatusContext.Provider value={{...state, dispatchStatus}}>
      { children }
    </StatusContext.Provider>
  )
}