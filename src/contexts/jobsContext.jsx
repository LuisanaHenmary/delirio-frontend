import { createContext, useReducer } from 'react'

export const JobContext = createContext()

export const jobReducer = (state, action) => {

  switch (action.type) {

    case 'SET_JOBS': 
      return {
        jobs: action.payload
      }
    default:
      return state
  }
}

export const JobContextProvider = ({ children }) => {
  const [state, dispatchJob] = useReducer(jobReducer, {
    jobs: []
  })

  return (
    <JobContext.Provider value={{...state, dispatchJob}}>
      { children }
    </JobContext.Provider>
  )
}