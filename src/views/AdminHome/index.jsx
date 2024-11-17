import CalendarView from "../Calendar"
import { useToDoContext } from "../../hooks/useToDoContext";
import TableEmployers from "../../components/TableEmployers";

const AdminHome = () =>{
    const { todoes } = useToDoContext()
    return(
        <>
        Welcome administrador
        <CalendarView events={todoes} />
        <TableEmployers />
        </>
    )
}

export default AdminHome