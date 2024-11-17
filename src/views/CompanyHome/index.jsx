import CalendarView from "../Calendar"
import { useToDoContext } from "../../hooks/useToDoContext";

const CompanyHome = () => {
    const { todoes } = useToDoContext()

    return (
        <>
            <CalendarView events={todoes} />
        </>
    )
}

export default CompanyHome