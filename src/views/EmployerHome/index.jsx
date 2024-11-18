import CalendarView from "../Calendar"
import { useToDoContext } from "../../hooks/useToDoContext";
import { Typography } from "@mui/material";

const EmployerHome = () => {
    const { todoes } = useToDoContext()

    return (
        <>
            <Typography component="h2" > Bienvenido empleado </Typography>
            <CalendarView events={todoes} />
        </>
    )
}

export default EmployerHome