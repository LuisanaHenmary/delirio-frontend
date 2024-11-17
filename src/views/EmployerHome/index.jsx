import CalendarView from "../Calendar"
import { useToDoContext } from "../../hooks/useToDoContext";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useState, useEffect } from "react";

const EmployerHome = ({id_employer}) =>{

    const { todoes } = useToDoContext()
    const [events, setEvents] = useState([])

    useEffect(()=>{

        const toDoesEmployer = todoes.filter((value)=>{
            return value.data.id_employer == id_employer
        })

        setEvents(toDoesEmployer)

    },[id_employer, todoes])


    return(
        <>
        Welcome empleado
        <CalendarView events={events} />
        </>
    )
}

export default EmployerHome