import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import NavBar from "../components/NavBars";
import { useAuthContext } from "../hooks/useAuthContext";
import { useToDoContext } from "../hooks/useToDoContext";
import { useEffect } from "react";
import { 
    getJobs,
    getStatus,
    getCompanies,
    getEmployers,
    getProjects,
    getToDoes,
} from "../api";
import { useEmployersContext } from "../hooks/useEmployersContext";
import { useCompaniesContext } from "../hooks/useCompanyContext";
import { useStatusContext } from "../hooks/useStatusContext";
import { useJobContext } from "../hooks/useJobContext";
import { useProjectsContext } from "../hooks/useProjectsContexr";

const Root = () =>{

    const { user } = useAuthContext()
    const { dispatch } = useToDoContext()
    const { dispatchEmployers } = useEmployersContext()
    const { dispatchCompanies } = useCompaniesContext()
    const { dispatchStatus } = useStatusContext()
    const { dispatchJob } = useJobContext()
    const { dispatchProjects } = useProjectsContext()

    useEffect(() => {
        try {
            if (user) {
                getToDoes(user, dispatch)
                getJobs(user, dispatchJob)
                getStatus(user, dispatchStatus)
                getCompanies(user, dispatchCompanies)
                getEmployers(user, dispatchEmployers)
                getProjects(user, dispatchProjects)
               
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