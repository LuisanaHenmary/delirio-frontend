import { createHashRouter } from "react-router-dom"
import ErrorPage from './error-page.jsx'
import Root from './root.jsx'
import Login from "../views/Login/index.jsx"

const router = createHashRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
      ],
    }
  ])
  
  export default router;