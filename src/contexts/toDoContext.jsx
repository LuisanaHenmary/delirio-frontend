import { createContext, useReducer } from 'react'

export const ToDoContext = createContext()

export const toDoReducer = (state, action) => {

  switch (action.type) {

    case 'SET_TO_DOES':
      return {
        todoes: action.payload
      }

    case 'CREATE_TO_DO':
      return {
        todoes: [...state.todoes, action.payload]
      }

    default:
      return state
  }
}

export const ToDoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toDoReducer, {
    todoes: []
  })

  return (
    <ToDoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ToDoContext.Provider>
  )
}