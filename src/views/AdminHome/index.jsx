import CalendarView from "../Calendar"
import { useToDoContext } from "../../hooks/useToDoContext";

const AdminHome = () =>{
    const { todoes } = useToDoContext()
    return(
        <>
        Welcome administrador
        <CalendarView events={todoes} />
        </>
    )
}

export default AdminHome