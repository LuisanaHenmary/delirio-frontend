import CalendarView from "../Calendar"
import { useState } from "react";
import { useOpen } from "../../hooks/useOpen";
import { useToDoContext } from "../../hooks/useToDoContext";
import { useToDoTypeContext } from "../../hooks/useToDoTypeContext";
import { useStatusContext } from "../../hooks/useStatusContext";
import ToDoCardCompany from "../../components/ToDoCardCompany";

const CompanyHome = () => {
    const { todoes } = useToDoContext()
    const { statues } = useStatusContext()
    const { to_do_types } = useToDoTypeContext()
    const [open, changeToOpen, changeToClose] = useOpen()
    const [toDoSelected, setToDoSelected] = useState({
        'id': 1,
        'title': "",
        'delivery_date': "",
        'statusName': "",
        'statusClass': "",
        'by_instragram':false,
        'by_facebook':false,
        'by_tiktok':false,
        'typeName':"",
        'content_todo':"",
        'copy_text': "",
    })

    const clickTodo = (e) => {
        const data = e.event._def.extendedProps.data
        const {
            id,
            title,
            delivery_date,
            content_todo,
            copy_text,
            by_instragram,
            by_facebook,
            by_tiktok,
            id_type,
            id_status
        } = data


        const status = statues.filter((value) => {
            return parseInt(value.id_status) == parseInt(id_status)
        })

        const statusName = status[0]['name_status']
        const statusClass = status[0]['className']


        const typeTodo = to_do_types.filter((value) => {
            return parseInt(value.id_type) == parseInt(id_type)
        })

        const typeName = typeTodo[0]['name_type']

        const info = {
            id,
            title,
            delivery_date,
            statusName,
            statusClass,
            typeName,
            content_todo,
            copy_text,
            by_instragram,
            by_facebook,
            by_tiktok,
        }

        setToDoSelected(info)
        changeToOpen()

    }

    return (
        <>
            <CalendarView events={todoes} todoClick={clickTodo} />
            <ToDoCardCompany open={open} info={toDoSelected} handleClose={changeToClose} />
        </>
    )
}

export default CompanyHome