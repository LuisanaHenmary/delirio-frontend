import AdminHome from "../AdminHome"
import { useAuthContext } from '../../hooks/useAuthContext';
import { Navigate } from "react-router-dom";
import EmployerHome from "../EmployerHome";
import CompanyHome from "../CompanyHome";

const Home = () => {
    const { user } = useAuthContext()

    return (
        <>
            {!user && (
                <Navigate to="/login" />
            )}
            {user && (
                <>
                    {user.role == "admin" ? <AdminHome /> : null}
                    {user.role == "employer" ? <EmployerHome /> : null}
                    {user.role == "company" ? <CompanyHome user={user} /> : null}
                </>
            )}

        </>
    )
}

export default Home