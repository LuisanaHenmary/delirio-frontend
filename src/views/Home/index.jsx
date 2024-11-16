import AdminHome from "../AdminHome"
import { Container } from "@mui/material";
import { useAuthContext } from '../../hooks/useAuthContext';
import { Navigate } from "react-router-dom";

const Home = () => {
    const { user } = useAuthContext()
    return (
        <Container>
            {!user && (
                <Navigate to="/login" />
            )}
            {user && (
                <>
                    {user.role == "admin" ? <AdminHome /> : null}
                </>
            )}
            
        </Container>
    )
}

export default Home