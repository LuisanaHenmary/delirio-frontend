import CalendarView from "../Calendar"
import { useToDoContext } from "../../hooks/useToDoContext";

const EmployerHome = () => {
    const { todoes } = useToDoContext()

    return (
        <>
            Welcome empleado
            <CalendarView events={todoes} />
        </>
    )
}

export default EmployerHome