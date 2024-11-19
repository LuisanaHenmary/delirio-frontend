import {
    Box,
    Button,
    Typography
} from "@mui/material"
import ToDoesTable from "../../components/ToDoesTable";
import { useOpen } from "../../hooks/useOpen";
import AddToDo from "../AddToDo";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import AddProject from "../AddProject";

const ToDoes = () => {
    const { user } = useAuthContext()
    const [addTodo, changeToOpenAddToDo, changeToCloseAddToDo] = useOpen()
    const [addProject, changeToOpenAddProject, changeToCloseAddProject] = useOpen()

    return (
        <Box>
            {!user && (<Navigate to="/login" />)}

            {user && (
                <>
                    {user.role == "admin" ? 
                    <>
                    <Button onClick={changeToOpenAddToDo} variant="contained" > Agregar tarea</Button>
                    <Button onClick={changeToOpenAddProject} variant="contained" > Agregar Proyecto</Button>
                    </> : null}
                    {user.role == "employer" ? 
                    <>
                    <Typography component="h4" >Sus tareas empleado {user.user_nicename}</Typography>
                    </> : null}
                    <ToDoesTable />
                    <AddToDo open={addTodo} handleClose={changeToCloseAddToDo} />
                    <AddProject open={addProject} handleClose={changeToCloseAddProject} />
                </>
            )}

            
            
        </Box>
    )
}

export default ToDoes