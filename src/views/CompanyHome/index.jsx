import CalendarView from "../Calendar"
import { useToDoContext } from "../../hooks/useToDoContext";

const CompanyHome = () => {
    const { todoes } = useToDoContext()

    const clickTodo = (e) => {
        const data = e.event._def.extendedProps.data
        console.log(data)
    }

    return (
        <>
            <CalendarView events={todoes} todoClick={clickTodo} />
        </>
    )
}

export default CompanyHome