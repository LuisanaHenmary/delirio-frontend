import CalendarView from "../Calendar"
import {
    Box, Typography
} from "@mui/material";
import { useToDoContext } from "../../hooks/useToDoContext";
import TableEmployers from "../../components/TableEmployers";
import TableCompanies from "../../components/TableCompanies";


const AdminHome = () => {
    const { todoes } = useToDoContext()

    const clickTodo = (e) => {
        const data = e.event._def.extendedProps.data
        console.log(data)
    }

    return (
        <>
            <Typography component="h2" > Bienvenido administrador </Typography>

            <CalendarView events={todoes} todoClick={clickTodo} />
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: '60px' }} >
                <TableEmployers />
                <TableCompanies />
            </Box>

        </>
    )
}

export default AdminHome