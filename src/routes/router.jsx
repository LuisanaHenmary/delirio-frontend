import { createHashRouter } from "react-router-dom"
import ErrorPage from './error-page.jsx'
import Root from './root.jsx'

const router = createHashRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
    }
  ])
  
  export default router;