
import { Navigate, Outlet } from "react-router-dom"

const PrivateRouter = () => {
  const currentUser = JSON.parse(sessionStorage.getItem("user")) 

  return currentUser ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRouter
