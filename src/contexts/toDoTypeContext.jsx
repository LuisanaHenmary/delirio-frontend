import { createContext, useReducer } from 'react'

export const ToDoTypeContext = createContext()

export const toDoTypeReducer = (state, action) => {

  switch (action.type) {

    case 'SET_TO_DO_TYPES': 
      return {
        to_do_types: action.payload
      }
    default:
      return state
  }
}

export const ToDoTypeContextProvider = ({ children }) => {
  const [state, dispatchTypes] = useReducer(toDoTypeReducer, {
    to_do_types: []
  })

  return (
    <ToDoTypeContext.Provider value={{...state, dispatchTypes}}>
      { children }
    </ToDoTypeContext.Provider>
  )
}