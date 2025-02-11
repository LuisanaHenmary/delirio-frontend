import { Outlet, Navigate } from "react-router-dom";
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
    getToDoes,
    getToDoTypes,
    getPlans
} from "../api";
import { useEmployersContext } from "../hooks/useEmployersContext";
import { useCompaniesContext } from "../hooks/useCompanyContext";
import { useStatusContext } from "../hooks/useStatusContext";
import { useJobContext } from "../hooks/useJobContext";
import { usePlanContext } from "../hooks/usePlanContext";
import { useToDoTypeContext } from "../hooks/useToDoTypeContext";

const Root = () => {

    const { user } = useAuthContext()
    const { dispatch } = useToDoContext()
    const { dispatchEmployers } = useEmployersContext()
    const { dispatchCompanies } = useCompaniesContext()
    const { dispatchStatus } = useStatusContext()
    const { dispatchJob } = useJobContext()
    const { dispatchPlan } = usePlanContext()
    const { dispatchTypes } = useToDoTypeContext()

    useEffect(() => {

        try {
            if (user) {
                getToDoes(user, dispatch)
                getJobs(user, dispatchJob)
                getStatus(user, dispatchStatus)
                getCompanies(user, dispatchCompanies)
                getEmployers(user, dispatchEmployers)
                getToDoTypes(user, dispatchTypes)
                getPlans(user, dispatchPlan)
            }
        } catch (e) {
            console.log(e)
        }

    }, [user])

    return (
        <>
            {!user && (
                <>
                    <Navigate to="/login" />
                    <Box component="div">
                        <Outlet />
                    </Box>
                </>
            )}

            {user && (
                <>
                    <Navigate to="/home" />
                    <NavBar username={user.user_display_name}>
                        <Box component="div">
                            <Outlet />
                        </Box>
                    </NavBar>
                </>
            )}



        </>
    )
}

export default Root