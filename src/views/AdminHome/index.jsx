import CalendarView from "../Calendar"
import {
    Box, Typography
} from "@mui/material";
import { useToDoContext } from "../../hooks/useToDoContext";
import TableEmployers from "../../components/TableEmployers";
import TableCompanies from "../../components/TableCompanies";


const AdminHome = () => {
    const { todoes } = useToDoContext()
    return (
        <>
            <Typography component="h2" > Bienvenido administrador </Typography>

            <CalendarView events={todoes} />
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: '60px' }} >
                <TableEmployers />
                <TableCompanies />
            </Box>

        </>
    )
}

export default AdminHome