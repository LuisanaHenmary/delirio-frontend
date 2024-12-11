import {
    Box,
    Typography
} from "@mui/material"
import ToDoesTable from "../../components/ToDoesTable";
import { useOpen } from "../../hooks/useOpen";
import AddToDo from "../AddToDo";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import AddProject from "../AddProject";
import { useToDoContext } from "../../hooks/useToDoContext";
import { useEffect, useState } from "react";
import { useStatusContext } from "../../hooks/useStatusContext";
import { useEmployersContext } from "../../hooks/useEmployersContext";
import { useCompaniesContext } from "../../hooks/useCompanyContext";
import { useProjectsContext } from '../../hooks/useProjectsContexr';
import { SaveButton, PlusIcon } from "./style";


const ToDoes = () => {
    const { user } = useAuthContext()
    const { todoes } = useToDoContext()
    const { statues } = useStatusContext()
    const { employers } = useEmployersContext()
    const { projects } = useProjectsContext()
    const { companies } = useCompaniesContext()
    const [addTodo, changeToOpenAddToDo, changeToCloseAddToDo] = useOpen()
    const [addProject, changeToOpenAddProject, changeToCloseAddProject] = useOpen()
    const [rows, setRows] = useState([])

    const loadRows = () => {
        const r = todoes.map((elem) => {
            const { title, expired, id_status, id_employer, id_company, id_project } = elem.data

            const status = statues.filter((value) => {
                return parseInt(value.id_status) == parseInt(id_status)
            })

            const statusName = status[0]['name_status']
            const statusClass = status[0]['className']

            const employer = employers.filter(value =>
                parseInt(value.id_employer) == parseInt(id_employer)
            );

            const employerName = employer[0]['name_employer']

            const company = companies.filter((value) => {
                return parseInt(value.id_company) == parseInt(id_company)
            })

            const companyName = company[0]['name_company']

            const project = projects.filter((value) => {
                return parseInt(value.id_project) == parseInt(id_project)
            })

            const projectName = project[0]['name_project']

            return {
                title,
                expired,
                statusName,
                statusClass,
                employerName,
                companyName,
                projectName
            }
        })

        setRows(r)
    }

    useEffect(() => {

        try {
            loadRows()
        }
        catch (e) {
            console.log(e)
        }

        /* */


    }, [todoes])

    return (
        <Box>
            {!user && (<Navigate to="/login" />)}

            {user && (
                <>
                    {user.role == "admin" ?
                        <>
                            <Box component="div" sx={{ display: "flex", justifyContent: "end" }} >
                                <SaveButton
                                    onClick={changeToOpenAddToDo}
                                    variant="contained"
                                    startIcon={<PlusIcon />}
                                >
                                    Agregar tarea
                                </SaveButton>

                                <SaveButton
                                    onClick={changeToOpenAddProject}
                                    variant="contained"
                                    startIcon={<PlusIcon />}
                                >
                                    Agregar Proyecto
                                </SaveButton>
                            </Box>

                            <AddToDo open={addTodo} handleClose={changeToCloseAddToDo} />
                            <AddProject open={addProject} handleClose={changeToCloseAddProject} />
                        </> : null}
                    {user.role == "employer" ?
                        <>
                            <Typography component="h4" >Sus tareas empleado {user.user_nicename}</Typography>
                        </> : null}

                    <ToDoesTable rows={rows} />
                </>
            )}
        </Box>
    )
}

export default ToDoes

/*
*/