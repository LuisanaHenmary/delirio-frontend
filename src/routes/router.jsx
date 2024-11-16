import { createHashRouter } from "react-router-dom"
import ErrorPage from './error-page.jsx'
import Root from './root.jsx'
import Login from "../views/Login/index.jsx"
import Home from "../views/Home/index.jsx"

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
        {
          path: "home",
          element: <Home />,
        },
      ],
    }
  ])
  
  export default router;