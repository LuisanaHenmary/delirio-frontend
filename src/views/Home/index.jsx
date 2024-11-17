import AdminHome from "../AdminHome"
import { Container } from "@mui/material";
import { useAuthContext } from '../../hooks/useAuthContext';
import { Navigate } from "react-router-dom";
import EmployerHome from "../EmployerHome";
import { useEffect, useState } from "react";
import { useEmployersContext } from "../../hooks/useEmployersContext";

const Home = () => {
    const { user } = useAuthContext()
    const [id_employer, setIdEmployer] = useState(0)
    const { employers } = useEmployersContext()

    useEffect(() => {

        if (user) {
            if (user.role === "employer") {
                const id = employers.filter((value) => {
                    return value.id_user == user.id_user
                })[0].id_employer

                setIdEmployer(id)
            }
        }

    }, [user])



    return (
        <Container>
            {!user && (
                <Navigate to="/login" />
            )}
            {user && (
                <>
                    {user.role == "admin" ? <AdminHome /> : null}
                    {user.role == "employer" ? <EmployerHome id_employer={id_employer} /> : null}
                </>
            )}

        </Container>
    )
}

export default Home