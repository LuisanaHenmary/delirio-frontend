import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import NavBar from "../components/NavBars";
import { useAuthContext } from "../hooks/useAuthContext";
import { useToDoContext } from "../hooks/useToDoContext";
import { useEffect } from "react";
import { getToDoes } from "../api";

const Root = () =>{

    const { user } = useAuthContext()
    const { dispatch } = useToDoContext()

    useEffect(() => {
        try {
            if (user) {
                getToDoes(user, dispatch)
               
            }
        } catch (e) {
            console.log(e)
        }

    }, [user])

    return (
        <Box>
            <NavBar />
            <Box component="div" id="detail" className="main-box">
                <Outlet />
            </Box>

        </Box>
    )
}

export default Root