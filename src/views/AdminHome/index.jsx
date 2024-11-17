import CalendarView from "../Calendar"
import { Box } from "@mui/material";
import { useToDoContext } from "../../hooks/useToDoContext";
import TableEmployers from "../../components/TableEmployers";
import TableCompanies from "../../components/TableCompanies";


const AdminHome = () => {
    const { todoes } = useToDoContext()
    return (
        <>
            Welcome administrador
            <CalendarView events={todoes} />
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: '60px' }} >
                <TableEmployers />
                <TableCompanies />
            </Box>

        </>
    )
}

export default AdminHome