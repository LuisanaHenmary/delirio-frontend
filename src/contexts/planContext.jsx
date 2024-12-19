import { createContext, useReducer } from 'react'

export const PlanContext = createContext()

export const planReducer = (state, action) => {

  switch (action.type) {

    case 'SET_PLANS': 
      return {
        plans: action.payload
      }
    default:
      return state
  }
}

export const PlanContextProvider = ({ children }) => {
  const [state, dispatchPlan] = useReducer(planReducer, {
    plans: []
  })

  return (
    <PlanContext.Provider value={{...state, dispatchPlan}}>
      { children }
    </PlanContext.Provider>
  )
}