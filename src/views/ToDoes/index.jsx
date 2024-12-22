import {
    Box,
    Typography
} from "@mui/material"
import ToDoesTable from "../../components/ToDoesTable";
import { useOpen } from "../../hooks/useOpen";
import AddToDo from "../AddToDo";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import { useToDoContext } from "../../hooks/useToDoContext";
import { useEffect, useState } from "react";
import { useCompaniesContext } from "../../hooks/useCompanyContext";
import { useToDoTypeContext } from "../../hooks/useToDoTypeContext";
import { SaveButton, PlusIcon } from "./style";


const ToDoes = () => {
    const { user } = useAuthContext()
    const { todoes } = useToDoContext()
    const { companies } = useCompaniesContext()
    const { to_do_types } = useToDoTypeContext()
    const [addTodo, changeToOpenAddToDo, changeToCloseAddToDo] = useOpen()
    const [rows, setRows] = useState([])

    const loadRows = () => {
        const r = todoes.map((elem) => {
            const {
                title,
                delivery_date,
                description_todo,
                material_link,
                id_type,
                id_company
            } = elem.data

            const typeTodo = to_do_types.filter((value) => {
                return parseInt(value.id_type) == parseInt(id_type)
            })

            const typeName = typeTodo[0]['name_type']

            const company = companies.filter((value) => {
                return parseInt(value.id_company) == parseInt(id_company)
            })

            const companyName = company[0]['name_company']

            return {
                title,
                delivery_date,
                typeName,
                companyName,
                description_todo,
                material_link
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
                                    startIcon={<PlusIcon />}
                                >
                                    Agregar tarea
                                </SaveButton>
                            </Box>

                            <AddToDo open={addTodo} handleClose={changeToCloseAddToDo} />
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